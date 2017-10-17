using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace Mgoo.CarRent.Common.Application_Error
{
    /// <summary>
    /// 全局异常监控，处理未处理的异常
    /// </summary>
    public class ExceptionHandlingAttribute : ExceptionFilterAttribute
    {
        /// <summary>
        /// 程序内部如有未处理的异常，则会进此方法
        /// </summary>
        /// <param name="context"></param>
        public override void OnException(HttpActionExecutedContext context)
        {
            var exception = context.Exception;

            Log.Error(this, exception);

            throw new MgooException(exception.Message);
        }
    }
}
