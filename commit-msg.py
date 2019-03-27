#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
import sys
from os.path import exists


def echo(msg, color='red'):
    if color == "green":
        print('\033[92m%s\033[0m' % msg)
    elif color == "blue":
        print('\033[94m%s\033[0m' % msg)
    elif color == "yellow":
        print('\033[93m%s\033[0m' % msg)
    elif color == "red":
        print('\033[91m%s\033[0m' % msg)
    else:
        print(msg)


def specification_check(filename):
    if exists(filename):
        with open(filename, "r") as fp:
            content = fp.read().split("\n")
            # remove invalid lines
            content = [line for line in content if not line.startswith("#")]
            # remove invalid blank line
            if content[-1] == '':
                content.pop(-1)
            # must have a line containing type and subject
            header = content[0]
            if re.match(r'^(feat|fix|docs|style|refactor|perf|test|chore|misc)\:\s?([\w\_\#\s\:\.]{1,49}$)', header):
                if len(content) > 1:
                    # Multi-line comment
                    blank = content[1]
                    if blank == '':
                        try:
                            # commit message body
                            body = content[2]
                            if not body:
                                raise ValueError
                        except (IndexError, ValueError):
                            echo("Error: please describe this commit in detail")
                            return 4
                        else:
                            return 0

                    else:
                        echo("Error: please keep a blank line before the body of commit message")
                        return 3
                else:
                    # Single-line comment
                    echo("Succes: committed message", "green")
                    return 0
            else:
                echo("Error: the header format is not standardized")
                return 2
    else:
        echo("Error: not found commit message file")
        return 1


if __name__ == "__main__":
    if len(sys.argv) > 1:
        sys.exit(specification_check(sys.argv[1]))
    else:
        echo("Error: not found commit message file param")
        sys.exit(127)
