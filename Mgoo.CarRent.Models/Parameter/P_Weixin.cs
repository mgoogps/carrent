using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Parameter
{
    public class P_Weixin
    {
        public class P_GetDeviceInfo : IParameterEntity
        {
            /// <summary>
            /// 设备id
            /// </summary>
            [Required,Range(1,int.MaxValue)]
            public int deviceid { get; set; }
            /// <summary>
            /// 微信分配的唯一的openid
            /// </summary>
            public int openid { get; set; }
            public IApiResult Validate()
            {
                return null;
            }
        }
    }
}
