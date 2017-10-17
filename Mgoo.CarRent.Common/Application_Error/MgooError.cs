using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Common.Application_Error
{
    /// <summary>
    /// 自定义异常
    /// </summary>
    public class MgooException : Exception
    {
        public MgooException(string auxMessage) : base(auxMessage)
        {
            this.HelpLink = "http://www.mgoo.net";
            this.Source = "美谷科技";
             
        }
        
        public override string Message
        {
            get
            {
                return "系统内部错误.";
            }
        }
        public override string StackTrace
        {
            get
            {
                return "系统出现严重的错误,请反馈给管理员.";
            }
        }
    }
}
