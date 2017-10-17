using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;

namespace Mgoo.CarRent.Models.Parameter
{
    /// <summary>
    /// 适用于参数只有一个ID的
    /// </summary>
    public class P_OnlyOneID :  IParameterEntity
    { 
        public int id { get; set; }
        public IApiResult Validate()
        {
            if (id <= 0)
            {
                return new IApiResult() { code = StatusCode.parameterError, message = "id parameter error..." };
            }
            return null;
        }
    }
}
