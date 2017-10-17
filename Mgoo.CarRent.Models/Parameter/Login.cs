using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using Mgoo.CarRent.Models.Attribute;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Parameter
{
    /// <summary>
    /// 登录参数
    /// </summary>
    public class PLogin : IParameterEntity  
    {
        /// <summary>
        /// 登录名
        /// </summary>
        [Required,MinLength(3), MaxLength(20)]
        public string login_name { get; set; }
        /// <summary>
        /// 登录密码
        /// </summary>
        [Required, MinLength(32),MaxLength(32)]
        public string login_password { get; set; }

        /// <summary>
        /// 标识符（全部大写）
        /// </summary>
        [Required]
        public string identifies { get; set; }
          
        
        public IApiResult Validate()
        {
            if (string.IsNullOrEmpty(login_name) || string.IsNullOrEmpty(login_password))
            {
                return new IApiResult() { code = StatusCode.parameterError , message = "账号密码不能为空.", result ="" };
            }
            return null;
        }
    }

    /// <summary>
    /// 注册参数
    /// </summary>
    public class PRegister : IParameterEntity
    {
        /// <summary>
        /// 手机号
        /// </summary>
        public string phone { get; set; }

        /// <summary>
        /// 登录名
        /// </summary>
        [Required, MinLength(3), MaxLength(20)]
        public string loginname { get; set; }

        /// <summary>
        /// 登陆密码
        /// </summary>
        [Required, MinLength(6),MaxLength(12)]
        public string password { get; set; }
        /// <summary>
        /// 确认密码
        /// </summary>
        public string confirmpwd { get; set; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string username { get; set; }


        /// <summary>
        /// 验证码
        /// </summary>
        [Required(ErrorMessage = "6 digits"), Min(100000), Max(999999)]
        public int code { get; set; }

        IApiResult IParameterEntity.Validate()
        {
            //if (code < 100000 || code > 999999)
            //{
            //    return new IApiResult() { code = StatusCode.parameterError, message = "code error..." };
            //}
           
            var cacheCode = CacheHelper.Get<int>(CarRent.Common.Lib.Config.SMS.PREFIX + phone);
            if (code != cacheCode)
            {
                return new IApiResult() { code = StatusCode.parameterError, message = "code error." };
            }
            if (password != confirmpwd) {
                return new IApiResult() { code = StatusCode.parameterError, message = "The two passwords are inconsistent" };
            }
            if (string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(username))
            {
                return new IApiResult() { code = StatusCode.parameterError, message = "Parameter cannot be null." };
            }
            return null;
        }

        //IApiResult IApiResult Validate()
        //{
        //    if (string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(username))
        //    {
        //        return new IApiResult() { code =  StatusCode.parameterError, message = "参数不能空." };
        //    }
        //    return null;
        //}
    }

    /// <summary>
    /// 发送短信
    /// </summary>
    public class P_SendCode :  IParameterEntity
    {
        /// <summary>
        /// 接收短信的手机号码，号码前需要加国际区号（例:8613888888888, 86是中国的国际区号）
        /// </summary>
        [Required,MinLength(5),MaxLength(20)]
        public string phone { get; set; }
        /// <summary>
        /// 类型 1： 注册,2：申请租车
        /// </summary>
        [Required,Range(1,2)]
        public int type { get; set; }

        public IApiResult Validate()
        {
            return null;
        }
    }

    /// <summary>
    /// 注销登录
    /// </summary>
    public class PLogout : IParameterEntity
    {
        public IApiResult Validate()
        {
            return null;
        } 
        
    }
}
