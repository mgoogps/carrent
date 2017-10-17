using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using System.Net.Http;
using System.Threading;
using System.Diagnostics;

namespace Mgoo.CarRent.WebApi
{
    public class RequestHandler : DelegatingHandler
    {
        protected async override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            //获取URL参数  
            // NameValueCollection query = HttpUtility.ParseQueryString(request.RequestUri.Query);
            //获取Post正文数据，比如json文本  
            string fRequesContent = request.Content.ReadAsStringAsync().Result;
            
            //请求处理耗时跟踪  
            Stopwatch sw = new Stopwatch();
            sw.Start();
            if (request.Content.IsMimeMultipartContent("form-data"))
            {
            //}
            //    if (request.Content.Headers.ContentLength >0 && request.Content.Headers.ContentType.MediaType == "multipart/form-data")
            //{
                var response_e = new HttpResponseMessage();
                response_e.Content = new StringContent(JsonHelper.ToJson(new IApiResult() { code= StatusCode.failure, message= "暂不支持form-data方式." }));
                response_e.StatusCode =  System.Net.HttpStatusCode.OK;
                return response_e;
            }
            //调用内部处理接口，并获取HTTP响应消息  
            HttpResponseMessage response = await base.SendAsync(request, cancellationToken);
            //篡改HTTP响应消息正文  
            // response.Content = new StringContent(response.Content.ReadAsStringAsync().Result.Replace(@"\\", @"\"));
            IApiResult ar = new IApiResult();
            if (response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                ar.code = StatusCode.error;
                IDictionary<string, object> dic = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
                dic = JsonHelper.ToObject<Dictionary<string, object>>(response.Content.ReadAsStringAsync().Result);
                if (dic.ContainsKey("Message"))
                {
                    ar.message = dic["Message"].ToString();
                }
                if (dic.ContainsKey("message"))
                {
                    if (dic.ContainsKey("code"))
                    {
                        ar.code = (StatusCode)Convert.ToInt32(dic["code"]);
                    } 
                    ar.message = dic["message"].ToString();
                }
                // var resText = response.Content.ReadAsStringAsync().Result.Replace(@"\\", @"\");
                //response.Content = new StringContent(JsonHelper.ToJson(new IApiResult() { code = StatusCode.error, result =   resText  }));
            }
            //if (response.StatusCode == System.Net.HttpStatusCode.MethodNotAllowed || response.StatusCode == System.Net.HttpStatusCode.InternalServerError)
            //{

            //}
            if (ar.code != StatusCode.success)
            {
                response.Content = new StringContent(JsonHelper.ToJson(ar));
            }

            response.StatusCode = System.Net.HttpStatusCode.OK;
            //response.Headers.Add("Content-type", "charset=UTF-8");
            sw.Stop();
            //记录处理耗时  
            long exeMs = sw.ElapsedMilliseconds;
            if (exeMs >= 6000)
            {
                Log.Info(this, request.RequestUri.AbsoluteUri, "API耗时:" + exeMs.ToString() + "ms", "Post参数：" + fRequesContent);
            }
            return response;
            // return await base.SendAsync(request, cancellationToken);
        }


    }
    /// <summary>
    /// WebApi基类
    /// </summary>
    public class WebApiBaseClass : ApiController
    {
        //public override Task<HttpResponseMessage> ExecuteAsync(HttpControllerContext controllerContext, CancellationToken cancellationToken)
        //{
        //    return base.ExecuteAsync(controllerContext, cancellationToken);
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// <param name="handle"></param>
        /// <returns></returns>
        public async Task<IApiResult> ApiAsync<TEntity>(TEntity entity, Func<TEntity, Task<IApiResult>> handle)
        {
            try
            {
                var entityBase = entity as IParameterEntity;
                if (entityBase == null)
                {
                    return new IApiResult { code = Interface.StatusCode.parameterError, message = "parameter error..." };
                }
                //var entityAbs = entity as AbstractParameter;
                var headers = Request.Headers;

                if (entityBase != null)
                {
                    var validResult = entityBase.Validate();
                    if (validResult != null)
                    {
                        return (IApiResult)validResult;
                    }
                }
                var result = handle(entity);

                return await result;
            }
            catch (Exception ex)
            {
                Log.Error(this, ex);
                return new IApiResult { code = Interface.StatusCode.error, message = "System exception..." };
            }
        }
        public async Task<IApiResult<TResult>> ApiAsync<TEntity, TResult>(TEntity entity, Func<TEntity, Task<IApiResult<TResult>>> handle)
        {
            try
            {
                var entityBase = entity as IParameterEntity;
                if (entityBase == null)
                {
                    return new IApiResult<TResult> { code = Interface.StatusCode.parameterError, message = "parameter error..." };
                } 
                var headers = Request.Headers;

                if (entityBase != null)
                {
                    var validResult = entityBase.Validate();
                    if (validResult != null)
                    {
                        return new IApiResult<TResult>() { code = validResult.code, message = validResult.message };
                    }
                }
                var result = handle(entity);

                return await result;
            }
            catch (Exception ex)
            {
                Log.Error(this, ex);
                return new IApiResult<TResult> { code = Interface.StatusCode.error, message = "System exception..." };
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="handle"></param>
        /// <returns></returns>
        public async Task<IApiResult> ApiAsync(Func<Task<IApiResult>> handle)
        {
            try
            {
                //处理请求
                var result = handle();
                return await result;
            }
            catch (Exception ex)
            {
                //异常日志：
                Log.Error(this, ex);
                return new IApiResult { code = Interface.StatusCode.error, message = "System exception." };
            }
        }
        public async Task<IApiResult<TReturn>> ApiAsync<TReturn>(Func<Task<IApiResult<TReturn>>> handle)
        {
            try
            {
                //处理请求
                var result = handle();
                return await result;
            }
            catch (Exception ex)
            {
                //异常日志：
                Log.Error(this, ex);
                return new IApiResult<TReturn> { code = Interface.StatusCode.error, message = "System exception." };
            }
        }
        /// <summary>
        /// 验证
        /// </summary>
        /// <param name="headers"></param>
        /// <returns></returns>
        private IApiResult Accreditation(HttpRequestHeaders headers)
        {
            if (!headers.Contains("Authorization"))
            {
                return new IApiResult() { code = Interface.StatusCode.accreditation, message = "Missing authentication parameters.", result = new { } };
            }
            string authorization = string.Join("", headers.GetValues("Authorization")); // 格式： Authorization@地图类型
            string[] arr = authorization.Split('@');
            string[] keys = new string[] { "MGOO", "CARRENT" };
            authorization = arr[0];
            if (!keys.Contains(authorization) || arr.Length != 2)
            {
                return new IApiResult() { code = Interface.StatusCode.accreditation, message = "Identity authentication failed.", result = new { } };
            }

            return null;
        }
        private Dictionary<string, string> Accreditation1(HttpRequestHeaders headers)
        {
            if (!headers.Contains("Authorization"))
            {
                return null;
                //return new HttpResult() { code = HttpResult.StatusCode.accreditation, message = "缺少认证参数.", result = new { } };
            }
            string authorization = string.Join("", headers.GetValues("Authorization")); // 格式： Authorization@地图类型
            string[] arr = authorization.Split('@');
            string[] keys = new string[] { "MGOO", "CARRENT" };
            authorization = arr[0];
            if (!keys.Contains(authorization) || arr.Length != 2)
            {
                return null;
                //return new HttpResult() { code = HttpResult.StatusCode.accreditation, message = "身份认证失败.", result = new { } };
            }

            return null;
        }
    }
}
