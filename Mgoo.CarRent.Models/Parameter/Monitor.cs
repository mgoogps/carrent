using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mgoo.CarRent.Common;

namespace Mgoo.CarRent.Models.Parameter
{
    public class PAlarmList : IParameterEntity
    {
        public int? userid { get; set; }

        IApiResult IParameterEntity.Validate()
        {
            if (userid == null || userid <= 0)
            {
                return new IApiResult() { code = Interface.StatusCode.parameterError };
            }
            return null;
        }
    }

    public class PDevicesList : IParameterEntity
    {
        public int? userid { get; set; }

        IApiResult IParameterEntity.Validate()
        {
            if (userid == null || userid <= 0)
            {
                return new IApiResult() { code = Interface.StatusCode.parameterError };
            }
            return null;
        }
    }
}
