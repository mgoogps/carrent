using Mgoo.CarRent.BLL;
using Mgoo.CarRent.Common;
using Mgoo.CarRent.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Mgoo.CarRent.Models.Parameter;
using System.Web.Http.Description;
using Mgoo.CarRent.Interface;

namespace Mgoo.CarRent.WebApi.Controllers
{
    /// <summary>
    /// 包含登录、注册、登出 等API
    /// </summary>
    [AuthFilter(OnlyLogin = true)]
    public class LoginController : WebApiBaseClass
    {
        /// <summary>
        /// 登录接口
        /// </summary>
        /// <param name="pars">登录参数</param> 
        /// <returns>  </returns>
        [HttpPost]
        [Route("api/Login")]
        [AuthFilter( OnlyLogin = false)]
        [ResponseType(typeof(Models.Return.R_Login))] 
        public async Task<IApiResult> SystemLogin([FromBody]PLogin pars)
        { 
            return await ApiAsync(pars, new LoginManager().Login);  
        }

        /// <summary>
        /// 退出登录接口
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/Logout")]
        [AuthFilter(OnlyLogin = true)]
        [ResponseType(typeof(IApiResult))]
        public async Task<IApiResult> Logout()
        {
            return await ApiAsync( ( ) =>
            {
                return Task.Run(() => {
                    CacheHelper.Remove(LoginUser.userInfo.GetCacheKey());
                    return new IApiResult() { code =  Interface. StatusCode.success, message = "success!" };
                });
            });
        }

        /// <summary>
        /// 注册接口
        /// </summary>
        /// <param name="reg"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/Register")] 
        [AuthFilter(OnlyLogin = false)]
        public async Task<IApiResult> Register([FromBody] Models.Parameter.PRegister reg)
        {
            return await ApiAsync(reg, new LoginManager().Register);
        }
        /// <summary>
        /// 发送手机短信
        /// </summary>
        /// <param name="pars"></param>
        /// <returns></returns>
        [HttpGet]
        [AuthFilter(OnlyLogin = false)]
        [Route("api/SendSMS")]
        public Task<IApiResult> SendCode([FromUri]P_SendCode pars)
        {
            return ApiAsync(pars,new LoginManager().SendSMS);
            //return VerificationCode.Send(phone);
        }
    }
}
