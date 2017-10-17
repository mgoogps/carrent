using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using System.Configuration;
using System.Web.Mvc;
using Mgoo.CarRent.WebApi.App_Start;
using Newtonsoft.Json.Converters;

namespace Mgoo.CarRent.WebUI
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // 在应用程序启动时运行的代码

            //初始化拦截器（在运行action）
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            //初始化WebApi接口
            GlobalConfiguration.Configure(WebApiConfig.Register);
             
            //设置返回值统一为json 
            //GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();

            //初始化写日志的等级（默认是3）
            //0.不输出日志; 1.只输出错误信息; 2.输出错误和正常信息; 3.输出错误信息、正常信息和调试信息
            Common.Log.LOG_LEVEL = Convert.ToInt32(ConfigurationManager.AppSettings["LOG_Level"]);

            try
            {
                //写LOG的路径 
                var path = ConfigurationManager.AppSettings["LOG_Path"].ToString();
                var curDate = DateTime.Now;
                path = path.Replace("yyyy", curDate.Year + "").Replace("mm", curDate.Month + "").Replace("dd", curDate.Day + "");
                if (System.IO.Path.IsPathRooted(path))
                {
                    //绝对路径
                    Common.Log.LOG_PATH = path;
                }
                else
                {
                    //相对路径
                    Common.Log.LOG_PATH = System.AppDomain.CurrentDomain.BaseDirectory + path;
                }
                if (!System.IO.Directory.Exists(Common.Log.LOG_PATH))//如果日志目录不存在就创建
                {
                    System.IO.Directory.CreateDirectory(Common.Log.LOG_PATH); 
                }
            }
            catch (Exception)
            {
                Common.Log.LOG_LEVEL = 0; 
            }
            // 忽略掉返回的JSON格式里值是null的属性   
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings = new Newtonsoft.Json.JsonSerializerSettings()
            {
                NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore 
            };
            //解决返回的JSON格式里时间是yyyy-MM-ddThh:mm:ss问题
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new IsoDateTimeConverter()
            {
                DateTimeFormat = "yyyy-MM-dd HH:mm:ss", 
            });

            //注册 Help Page ，自动生成API文档
            //访问地址 domain.com/Help
            AreaRegistration.RegisterAllAreas();
             
        } 
      
    }
}