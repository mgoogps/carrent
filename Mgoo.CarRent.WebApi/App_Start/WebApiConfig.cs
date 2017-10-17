using Mgoo.CarRent.Common;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;

namespace Mgoo.CarRent.WebApi.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
          
            //注册拦截器(在运行action之前)
            config.MessageHandlers.Add(new RequestHandler());

            //全局异常捕获
            config.Filters.Add(new Common.Application_Error.ExceptionHandlingAttribute());
             
            // Web API 配置和服务
            // Web API 路由
            config.MapHttpAttributeRoutes();
           
            //配置Web API 路由 访问的方式
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi1",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);
        }
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
