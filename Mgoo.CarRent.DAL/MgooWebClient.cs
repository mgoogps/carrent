using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Net.Http;
namespace Mgoo.CarRent.DAL
{
    public class MgooWebClient
    {
       /// <summary>
       /// 发送请求(POST,GET),默认是POST请求
       /// </summary>
       /// <returns></returns>
        public string Send(Dictionary<string, string> headers = null) 
        { 
            try
            {
                System.GC.Collect();//垃圾回收，回收没有正常关闭的http连接
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(this.Url);
                request.Method = this.Method.ToUpper(); 
                if (ToKen != null)
                {
                    request.Headers.Add("ToKen", ToKen);
                }
                if (headers != null)
                {
                    foreach (KeyValuePair<string, string> item in headers)
                    {
                        request.Headers.Add(item.Key, item.Value);
                    }
                }
                if (this.Method.ToUpper() == "POST")
                {
                    request.ContentType = this.ContentType; //采取POST方式必须加的header，如果改为GET方式的话就去掉这句话即可  
                    request.ContentLength = this.PostData.Length;
                    request.Timeout = 6 * 1000;
                    using (Stream stream = request.GetRequestStream())
                    {
                        stream.Write(this.PostData, 0, this.PostData.Length);
                    }
                } 
                using (WebResponse response = request.GetResponse())
                {
                    using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("UTF-8"))) 
                    {
                        return reader.ReadToEnd();
                    }
                } 
            }
            catch (WebException wex)
            {
               // log("WebException:" + wex.Message + ",RequestUrl" + this.RequestUrl + "-" + this.RequestMethodName + " --- 堆栈：" + wex.StackTrace);
               // HttpWebResponse errorResponse = wex.Response as HttpWebResponse;
               // HttpStatusCode errorHttpStatusCode = errorResponse.StatusCode;
            
                throw wex;
            }
            catch (Exception ex)
            {
               // log("Exception:" + ex.Message + ",RequestUrl" + this.RequestUrl + "-" + this.RequestMethodName + " --- 堆栈：" + ex.StackTrace);
                throw ex;
            } 
        } 

        //public String RequestGet()
        //{ 
        //    WebClient webClient = new WebClient();
        //    webClient.Headers.Add("ToKen",ToKen);
        //    return webClient.DownloadString(this.RequestUrl + this.RequestMethodName);  
        //}
      
        private String _Url; 
        private String _Method;
        private String _ContentType;
        private byte[] _PostData;
        private static String _ToKen; 
        //private String dName;

        /// <summary>
        /// 请求的地址，根据配置文件读取前半部分
        /// </summary>
        public string Url
        {
            get
            {
                //if (requestUrl == null)
                //{
                //    requestUrl = ConfigurationManager.ConnectionStrings["url"].ConnectionString;
                   
                //   // requestUrl = "http://api.mgoogps.com/";
                //}
                return _Url;
            }

            set
            {
                _Url = value;
            }
        }
         
        /// <summary>
        /// 请求的方式(POST,GET,DELETE)，默认是POST
        /// </summary>
        public string Method 
        {
            get
            {
                if (_Method == null)
                {
                    this._Method = "POST";
                }
                return _Method;
            }

            set
            {
                _Method = value;
            }
        }

        /// <summary>
        /// 数据格式以及编码方式
        /// </summary>
        public string ContentType
        {
            get
            {
                if (this._ContentType == null)
                {
                    _ContentType = "application/json;charset=utf-8";
                }
                return _ContentType;
            }

            set
            {
                _ContentType = value;
            }
        }
         
        /// <summary>
        /// POST提交时的参数，默认是new byte[0]
        /// </summary>
        public byte[] PostData
        {
            get
            {
                if (_PostData == null)
                {
                    _PostData = new byte[0];
                }
                return _PostData;
            }

            set
            {
                _PostData = value;
            }
        }
        /// <summary>
        /// 请求的方法名称
        /// </summary>
        //public string RequestMethodName
        //{
        //    get
        //    {
        //        return requestMethodName;
        //    }

        //    set
        //    {
        //        requestMethodName = value;
        //    }
        //}

        /// <summary>
        /// 登录的Token
        /// </summary>
        public static string ToKen
        {
            get
            {
                return _ToKen;
            } 
            set
            {
                _ToKen = value;
            }
        }
         
        /// <summary>
        /// 写入Log信息
        /// </summary>
        /// <param name="LogStr">要写入的字符串</param>
        /// <param name="path">写入的路径(默认的是D:\Log)</param>
        public static void log(string LogStr, string path = null)
        {
            string p = "D://Log";
            if (path == null)
            {
                path = @"D:/Log/" + DateTime.Now.ToString("yyyy-MM-dd") + ".log";
            }
            else
            {
                p = path;
                path = p + "/" + DateTime.Now.ToString("yyyy-MM-dd") + ".log";
            }
            if (!Directory.Exists(p))
            {
                Directory.CreateDirectory(p);
            }
            if (!File.Exists(path))
            { 
                File.Create(path).Close();
            }
            StreamWriter sw = null;
            try
            {
                LogStr = DateTime.Now.ToLocalTime().ToString() + "  \n" + LogStr;
                sw = new StreamWriter(path, true);
                sw.WriteLine(LogStr);
            }
            catch (Exception  )
            {

            }
            finally
            {
                if (sw != null)
                {
                    sw.Close();
                }
            }

        }

    }
}
