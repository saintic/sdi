ARG buildos=node:22-slim
ARG runos=joseluisq/static-web-server:2

# -- build dependencies --
FROM $buildos AS builder
WORKDIR /app
COPY . .
ARG REGISTRY=""
RUN corepack enable \
    && if [ -n "$REGISTRY" ]; then pnpm config set registry "$REGISTRY"; fi \
    && pnpm install --frozen-lockfile \
    && pnpm run build

# -- run application with a small image --
FROM $runos
COPY --from=builder /app/dist/* /app/public/
EXPOSE 1234
WORKDIR /app
ENTRYPOINT ["/static-web-server", "--port", "1234"]
