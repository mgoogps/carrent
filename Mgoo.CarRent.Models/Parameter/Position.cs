using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mgoo.CarRent.Common;
using System.ComponentModel.DataAnnotations;
using Mgoo.CarRent.Models.Attribute;

namespace Mgoo.CarRent.Models.Parameter
{
    public class P_Position
    {
        public class PTranslate : IParameterEntity
        {
            /// <summary>
            /// 源坐标	
            /// 格式: 经度,纬度
            /// 举例: 114.21892734521,29.575429778924
            /// </summary>
            [Required]
            public string coords { get; set; }

            /// <summary>
            /// 源坐标类型
            /// 1：原始坐标系，wgs84;
            /// 2：高德坐标系，GCJ02;
            /// 3：百度坐标系，BD09;
            /// </summary>
            [Required, Min(1), Max(3)]
            public int from { get; set; }

            /// <summary>
            /// 目的坐标类型
            /// 1：原始坐标系，wgs84;
            /// 2：高德坐标系，GCJ02;
            /// 3：百度坐标系，BD09;
            /// </summary>
            [Required, Max(3), Min(1)]
            public int to { get; set; }

            //public HttpResult Validate()
            //{
            //    if (from == to)
            //    {
            //        return new HttpResult() {  code = HttpResult.StatusCode.failure, message="from 和 to 参数不能一样."};
            //    }
            //    if (coords.Split(',').Length != 2)
            //    {
            //        return new HttpResult() { code = HttpResult.StatusCode.failure, message = "coords格式错误" };
            //    }
            //    return null;
            //}

            IApiResult IParameterEntity.Validate()
            {
                if (from == to)
                {
                    return new IApiResult() { code = StatusCode.failure, message = "from 和 to 参数不能一样." };
                }
                if (coords.Split(',').Length != 2)
                {
                    return new IApiResult() { code = StatusCode.failure, message = "coords格式错误" };
                }
                return null;
            }
        }

        public class PGetAddress : IParameterEntity
        {
            /// <summary>
            /// 纬度
            /// </summary>
            public double lat { get; set; }

            /// <summary>
            /// 经度
            /// </summary>
            public double lng { get; set; }

            /// <summary>
            /// 返回值的语言
            /// 默认是：zh-CN 中文简体
            /// 如果是用Google获取国外的地址，需要填此参数 
            /// 参见： https://developers.google.com/maps/faq#languagesupport
            /// </summary>
            public string language { get; set; } = "zh-CN";

            /// <summary>
            /// BAIDU,GOOGLE,AMAP
            /// 默认是：AMAP
            /// </summary>
            public string type { get; set; } = "AMAP";

            //public HttpResult Validate()
            //{
            //    if (string.IsNullOrEmpty(language))
            //    {
            //        language = "zh-CN";
            //    }
            //    if (string.IsNullOrEmpty(type))
            //    {
            //        type = "AMAP";
            //    }
            //    type = type.ToUpper();

            //    language = language.ToUpper();
            //    return null;
            //}

            IApiResult IParameterEntity.Validate()
            {
                //if (string.IsNullOrEmpty(language))
                //{
                //    language = "";
                //}
                //if (string.IsNullOrEmpty(type))
                //{
                //    type = "AMAP";
                //}
                type = type.ToUpper();

                language = language.ToUpper();
                return null;
            }
        }
    }
}