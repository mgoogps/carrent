using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Mgoo.CarRent.WebApi
{
    /// <summary>  
    /// 验证模型过滤器、Authorization验证、Token验证
    /// </summary>  
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class AuthFilterAttribute : ActionFilterAttribute
    {
        /// <summary>   
        /// 匿名可访问,如果设置为true，则不需要加Authorization也可以访问
        /// </summary>
        public bool AllowAnonymous { get; set; } = false;

        /// <summary>
        /// 登录用户就可以访问
        /// </summary>
        public bool OnlyLogin { get; set; } = true;

        /// <summary>
        /// 使用的资源权限名，比如多个接口可以使用同一个资源的权限，默认是/ControllerName/ActionName
        /// </summary>
        public string PowerName { get; set; }

        /// <summary>
        /// 过滤器
        /// </summary>
        /// <param name="actionContext"></param>
        public sealed override void OnActionExecuting(HttpActionContext actionContext)
        {
            //var response = actionContext.Response;
            //var request = actionContext.Request;
            #region 验证
             
            var headers = actionContext.Request.Headers;

            var newresponse = new System.Net.Http.HttpResponseMessage();
            var verification = VerificationHeaders(headers);
            IApiResult hr = new IApiResult();
            if (!AllowAnonymous && verification != null)
            {
                hr = verification; 
            }
            else
            {
                //需要登录才能继续操作
                if (OnlyLogin)
                {
                    var authorization = string.Join("", headers.GetValues("Authorization"));
                    string[] author = authorization.Split('@');
                    var map = author[1];
                    authorization = author[0];
                    if (!headers.Contains("Token"))
                    {
                        hr.code =  StatusCode.accreditation;
                        hr.message = "Lack of authentication parameters."; 
                    }
                    else
                    {
                        var Token = string.Join("", headers.GetValues("Token"));
                        var cacheKey = authorization + "@" + map + Token;
                        Models.Entity.LoginUserInfo curUser = Common.CacheHelper.Get<Models.Entity.LoginUserInfo>(cacheKey);
                        if (curUser != null)
                        {
                            BLL.LoginUser.userInfo = curUser;
                            BLL.LoginUser lu = new BLL.LoginUser();
                            lu.User = curUser;
                        }
                        else
                        {
                            hr.message = "User not logged in.";
                            hr.code = StatusCode.tokenFail;
                        }
                    }
                }
            }
            if (hr.code ==  StatusCode.success)
            {
                newresponse.StatusCode = System.Net.HttpStatusCode.OK; 
            }
            else
            { 
                newresponse.Content = new System.Net.Http.StringContent(JsonHelper.ToJson(hr), Encoding.UTF8);
                newresponse.StatusCode = System.Net.HttpStatusCode.Accepted;
                actionContext.Response = newresponse;
                return;
            }
            //actionContext.Response.StatusCode = System.Net.HttpStatusCode.MovedPermanently;
            //actionContext.Response.Content = new System.Net.Http.StringContent("需要登录才能操作.");
            #endregion

            #region 请求参数验证
            if (actionContext.ActionArguments.Any(kv => kv.Value == null))
            {
                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "参数不能为空");
            }
            if (actionContext.ModelState.IsValid)
                return;
            var errors = actionContext.ModelState.Values.Where(a => a.Errors.Count > 0);
            if (errors.Count() > 0)
            {
                var resText = new IApiResult() { code = Interface.StatusCode.parameterError, message = errors.First().Errors.First().ErrorMessage };
                var response = new HttpResponseMessage();
                response.Content = new StringContent(JsonHelper.ToJson(resText));
                response.StatusCode = HttpStatusCode.BadRequest;

                actionContext.Response = response;
            } 
            #endregion
             
            base.OnActionExecuting(actionContext);
        }
        private IApiResult VerificationHeaders(System.Net.Http.Headers.HttpRequestHeaders headers)
        {
            if (!headers.Contains("Authorization"))
            {
                return new IApiResult() { code = Interface.StatusCode.accreditation, message = "Lack of authentication parameters.", result=new {a="a" } };
            }
            string authorization = string.Join("", headers.GetValues("Authorization")); // 格式： Authorization@地图类型
            string[] arr = authorization.Split('@');
            string[] keys = new string[] { "MGOO", "CARRENT" };
            authorization = arr[0];
            if (!keys.Contains(authorization) || arr.Length != 2)
            {
                return new IApiResult() { code = Interface.StatusCode.accreditation, message = "Authentication failure." };
            }

            return null;
        }
      
    }
}
