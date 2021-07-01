prefix = "http://exam.chinaedu.net/oxer";
selfUrl = "http://www.51xcjyw.com/";
self_jzUrl = "http://teaching.zhiya100.com/";
Main_Url={
                getURL : function(string){
                        var name = string,url="";
                        for( var i=0;i<Main_Url.url_list.length;i++ ){
                                if( name === Main_Url.url_list[i].name ){
                                        url = Main_Url.url_list[i].value;
                                        break;
                                }
                        }
                        return url;
                },
                url_list : [
                      {
                          name:"chinaedu2_scrollTopHtml",
                          value:"http://lms.chinaedu.net/venus/scrollTo_top.html"
                      },
                      {
                          name:"chinaedu2_iframeHtml",
                          value:"http://lms.chinaedu.net/venus/resources/venus/js/app/iframe.html"
                      },
                      {
                          name:"chinaedu2_iframeJs",
                          value:"http://lms.chinaedu.net/venus/resources/venus/js/app/iframe.js"
                      },
                      {
                          name:"CJBZBE20008_scrollTopHtml",
                          value:"http://lmsnbys.chinaedu.net/venus/scrollTo_top.html"
                      },
                      {
                          name:"CJBZBE20008_iframeHtml",
                          value:"http://lmsnbys.chinaedu.net/venus/resources/venus/js/app/iframe.html"
                      },
                      {
                          name:"CJBZBE20008_iframeJs",
                          value:"http://lmsnbys.chinaedu.net/venus/resources/venus/js/app/iframe.js"
                      },
                      {
                          name:"CJBZBE20009_scrollTopHtml",
                          value:"http://lmswbys.chinaedu.net/venus/scrollTo_top.html"
                      },
                      {
                          name:"CJBZBE20009_iframeHtml",
                          value:"http://lmswbys.chinaedu.net/venus/resources/venus/js/app/iframe.html"
                      },
                      {
                          name:"CJBZBE20009_iframeJs",
                          value:"http://lmswbys.chinaedu.net/venus/resources/venus/js/app/iframe.js"
                      }
                ]
}
