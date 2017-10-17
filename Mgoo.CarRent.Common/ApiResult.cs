using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Common
{
    ///// <summary>
    ///// webapi 统一 返回类
    ///// </summary>
    //public class ApiResult<T> : Interface.IApiResult<T>
    //{
    //    //public static string GetHttpResult(StatusCode code, string message, object result = null)
    //    //{
    //    //    HttpResult hr = new HttpResult();
    //    //    hr.code = code;
    //    //    hr.message = message;
    //    //    hr.result = result ;
    //    //    return JsonHelper.ToJson(hr);
    //    //}
    //    //public static string GetHttpResult(HttpResult hr)
    //    //{
    //    //    return JsonHelper.ToJson(hr);
    //    //}
    //    /// <summary>
    //    /// 状态码 枚举
    //    /// </summary>
    //    //public enum StatusCode
    //    //{
    //    //    /// <summary>
    //    //    ///  正常
    //    //    /// </summary>
    //    //    success = 0,

    //    //    /// <summary>
    //    //    /// 参数错误
    //    //    /// </summary>
    //    //    parameterError = 1,

    //    //    /// <summary>
    //    //    /// 操作失败
    //    //    /// </summary>
    //    //    failure = 2,

    //    //    /// <summary>
    //    //    /// 出现异常
    //    //    /// </summary>
    //    //    error = 3,

    //    //    /// <summary>
    //    //    /// token失效或无效的token
    //    //    /// </summary>
    //    //    tokenFail = 4,

    //    //    /// <summary>
    //    //    /// 登录信息失效
    //    //    /// </summary>
    //    //    loginFailure = 5,  

    //    //    /// <summary>
    //    //    /// 没有权限
    //    //    /// </summary>
    //    //    permissions = 6,

    //    //    /// <summary>
    //    //    /// 认证失败（根据客户端传过来的Authorization认证）
    //    //    /// </summary>
    //    //    accreditation = 7,
    //    //}

    //    private StatusCode _code;
    //    private string _message;
    //    private T _result;

    //    /// <summary>
    //    /// 状态码
    //    /// </summary>
    //    public StatusCode code
    //    {
    //        get
    //        {
    //            return _code;
    //        }

    //        set
    //        {
    //            _code = value;
    //        }
    //    }
    //    /// <summary>
    //    /// 说明
    //    /// </summary>
    //    public string message
    //    {
    //        get
    //        {
    //            return _message ?? string.Empty;
    //        }

    //        set
    //        {
    //            _message = value;
    //        }
    //    }
    //    /// <summary>
    //    /// 返回值
    //    /// </summary>
    //    public virtual T result
    //    {
    //        get
    //        {
    //            return _result  ;
    //        }

    //        set
    //        {
    //            _result = value;
    //        }
    //    }
    //}
}
