using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Interface
{
    /// <summary>
    /// I状态码枚举
    /// </summary>
    public enum StatusCode
    {
        /// <summary>
        ///  成功
        /// </summary>
        success = 0,

        /// <summary>
        /// 参数错误
        /// </summary>
        parameterError = 1,

        /// <summary>
        /// 操作失败
        /// </summary>
        failure = 2,

        /// <summary>
        /// 出现异常
        /// </summary>
        error = 3,

        /// <summary>
        /// token失效或无效的token
        /// </summary>
        tokenFail = 4,

        ///// <summary>
        ///// 登录信息失效
        ///// </summary>
        //loginFailure = 5,

        /// <summary>
        /// 没有权限
        /// </summary>
        permissions = 6,

        /// <summary>
        /// 认证失败（根据客户端传过来的Authorization认证）
        /// </summary>
        accreditation = 7,
    }
}
