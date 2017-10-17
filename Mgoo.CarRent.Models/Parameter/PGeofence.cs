using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Parameter
{
    public class PGeofence
    {
        /// <summary>
        /// 添加电子围栏的参数
        /// </summary>
        public class AddGeofenceCircle : IParameterEntity
        {
            /// <summary>
            /// 电子围栏名称
            /// </summary>
            public string name { get; set; }
            /// <summary>
            /// 半径
            /// </summary>
            public double radius { get; set; }
            /// <summary>
            /// 用户ID
            /// </summary>
            public int userid { get; set; }

            /// <summary>
            /// 设备ID(如果 deviceid为空或者为0，则为该用户所有设备设置围栏)
            /// </summary>
            public int deviceid { get; set; }
            /// <summary>
            /// 纬度
            /// </summary>
            public decimal? latitude { get; set; }
            /// <summary>
            /// 经度
            /// </summary>
            public decimal? longitude { get; set; }
            /// <summary>
            /// 备注
            /// </summary>
            public string description { get; set; }

            public IApiResult Validate()
            {
                if (string.IsNullOrEmpty(name))
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "name error." };
                }
                if (radius < 50)
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "Radius can not be less than 50 meters." };
                }
                if (latitude == 0 || latitude == -1.0m)
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "latitude error." };
                }

                if (longitude == 0 || longitude == -1.0m)
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "longitude error." };
                }
                if (userid <= 0)
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "userid error." };
                }
                return null;
            }

        }


        public class AddGeofencePolygon : IParameterEntity
        {
            /// <summary>
            /// 围栏名称
            /// </summary>
            [MaxLength(200)]
            public string name { get; set; }
            /// <summary>
            /// 围栏绑定的用户ID
            /// </summary>
            [Required, Range(1, int.MaxValue)]
            public int userid { get; set; }
            /// <summary>
            /// 西南角的纬度
            /// </summary>
            [Required]
            public decimal south_west_lat { get; set; }
            /// <summary>
            /// 西南角的经度
            /// </summary>
            [Required]
            public decimal south_west_lng { get; set; }
            /// <summary>
            /// 东北角的纬度
            /// </summary>
            [Required]
            public decimal north_east_lat { get; set; }
            /// <summary>
            /// 东北角的经度
            /// </summary>
            [Required]
            public decimal north_east_lng { get; set; }
            /// <summary>
            /// 界限的经纬度,最少三组经纬度,格式：lat,lng|lat,lng|lat,lng      举例：41.489715,123.50642|41.483577,123.493149|41.467728,123.481067|41.474391,123.456519
            /// </summary>
            [Required]
            public string bounds { get; set; }
            /// <summary>
            /// 备注
            /// </summary>
            public string description { get; set; }

            public IApiResult Validate()
            {
                var bs = bounds.Split('|');
                if (bs.Length < 3)
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "bounds error..." };
                }
                return null;
            }
        }
    }
}
