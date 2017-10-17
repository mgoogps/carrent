using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Mgoo.CarRent.WebApi.Controllers
{
    /// <summary>
    /// App检查更新
    /// </summary>
    public class UpdateController:WebApiBaseClass
    { 
        /// <summary>
        /// APP差量更新检查
        /// </summary>
        /// <param name="version">版本号</param>
        /// <param name="package">包名</param>
        /// <returns></returns>
        [HttpGet]
        public IApiResult Wgt(string version, string package)
        {
            IApiResult ar = new IApiResult();
            try
            {
                if (string.IsNullOrEmpty(version))
                {
                    ar.message = "No new version detected.";
                    ar.code = Interface.StatusCode.failure;
                    return ar;
                }
                if (string.IsNullOrEmpty(package))
                {
                    package = "MgooGps";
                }
                DirectoryInfo dir = new DirectoryInfo(System.AppDomain.CurrentDomain.BaseDirectory + @"/app/" + package);
                if (!dir.Exists)
                {
                    ar.message = "Is the latest version.";
                    ar.code = Interface.StatusCode.failure;
                    return ar;
                }
                FileInfo[] fi = dir.GetFiles("*.wgt");
                if (fi.Length <= 0)
                {
                    ar.message = "Is the latest version.";
                    ar.code = Interface.StatusCode.failure;
                    return ar;
                }
                DateTime time = new DateTime(2000, 1, 1);
                int index = 0;
                for (int i = 0; i < fi.Length; i++)
                {
                    if (fi[i].Name.EndsWith(".wgt") && fi[i].Name.Split('_').Length > 1)
                    {
                        if (fi[i].CreationTime > time)
                        {
                            time = fi[i].CreationTime;
                            index = i;
                        }
                    }
                }
                if (fi[index].Name.Split('_')[1].Replace(".wgt", "").CompareTo(version) == 1)// 比较ASC码，大返回1，等于返回0，小返回-1
                {
                    string domain = Request.RequestUri.Host; //当前服务器的 域名 or ip
                    int port = Request.RequestUri.Port;  //当前访问的端口号
                    string url = "http://" + domain + ":" + port + "/app/" + package + "/" + fi[index].Name;
                    ar.message = "There is a new version, please download the update.";
                    ar.result = new { url = url };
                    return ar;
                }
                else
                {
                    ar.message = "Is the latest version.";
                    ar.code = Interface.StatusCode.failure;
                    return ar;
                }
            }
            catch (Exception ex)
            {
                Log.Error(this, ex);
                ar.message = ex.Message;
                ar.code = Interface.StatusCode.error;
                return ar;
            }
        }
        /// <summary>
        /// Android应用检查更新
        /// </summary>
        /// <param name="version">版本号</param>
        /// <param name="package">包名</param>
        /// <returns></returns>
        [HttpGet]
        public IApiResult Apk(string version, string package)
        {
            IApiResult ar = new IApiResult(); 
            try
            {
                if (string.IsNullOrEmpty(version))
                {
                    ar.message = "No new version detected.";
                    ar.code = Interface.StatusCode.failure;
                    return ar;
                }
                if (string.IsNullOrEmpty(package))
                {
                    package = "MgooGps";
                }
              
                DirectoryInfo dir = new DirectoryInfo(System.AppDomain.CurrentDomain.BaseDirectory + @"/app/" + package);
                if (!dir.Exists)
                {
                    ar.message = "Is the latest version.";
                    ar.code = Interface.StatusCode.failure;
                    return ar;
                }
                FileInfo[] fi = dir.GetFiles("*.apk");
                if (fi.Count() <= 0)
                {
                    ar.message = "Is the latest version.";
                    ar.code = Interface.StatusCode.failure;
                    return ar;
                }
                DateTime time = new DateTime(2000, 1, 1);
                int index = 0;
                for (int i = 0; i < fi.Length; i++)
                {
                    string fiName = fi[i].Name;
                    if (fiName.EndsWith(".apk") && fiName.IndexOf("beta") >= 0 && fiName.Split('_').Length > 1)
                    {
                        index = i;
                        break;
                    }
                    if (fiName.EndsWith(".apk") && fiName.Split('_').Length > 1)
                    {
                        if (fi[i].CreationTime > time)
                        {
                            time = fi[i].CreationTime;
                            index = i;
                        }
                    }
                }
                 
                if (fi[index].Name.Split('_')[1].Replace(".apk", "").CompareTo(version) == 1)// 比较ASC码，大返回1，等于返回0，小返回-1
                {
                    string domain = Request.RequestUri.Host; //当前服务器的 域名 or ip
                    int port = Request.RequestUri.Port;  //当前访问的端口号
                    string url = "http://" + domain + ":" + port + "/app/" + package + "/" + fi[index].Name;
                    //有新版本，则返回下载地址.
                    ar.message = "There is a new version, please download the update.";
                    ar.result = new { url = url };
                    return ar;
                }
                else
                {
                    ar.message = "Is the latest version.";
                    ar.code = Interface.StatusCode.failure;
                    return ar;
                }
            }
            catch (Exception ex)
            {
                Log.Error(this,ex);
                ar.message = ex.Message;
                ar.code = Interface.StatusCode.failure;
                return ar;
            }
          
        }
    }
}
