using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Parameter
{
   public class PTest :  IParameterEntity
    {
        public string a { get; set; }
        public string b { get; set; }

   

        //public HttpResult Validate()
        //{
        //    if (string.IsNullOrEmpty(a) ||string.IsNullOrEmpty(b))
        //    {
        //        return new HttpResult() { code = HttpResult.StatusCode.failure, message = "no", result = new { } };
        //    }
        //    return null;
        //}

        IApiResult IParameterEntity.Validate()
        {
            if (string.IsNullOrEmpty(a) || string.IsNullOrEmpty(b))
            {
                return new IApiResult() { code =  StatusCode.failure, message = "no", result = new { } };
            }
            return null;
        }
    }
}
