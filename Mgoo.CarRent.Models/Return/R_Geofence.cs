using Mgoo.CarRent.Common;
using Mgoo.CarRent.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Return
{
   public  class R_Geofence
    {
        /// <summary>
        /// 获取电子围栏列表接口返回值
        /// </summary>
        public class R_GetGeofenceList : IApiResult
        {
            /// <summary>
            /// 围栏ID
            /// </summary>
            public int GeofenceID { get; set; }

            /// <summary>
            /// 创建时间
            /// </summary>
            public DateTime Created { get; set; }
            /// <summary>
            /// 围栏名称
            /// </summary>
            public string FenceName { get; set; }

            /// <summary>
            /// 描述
            /// </summary>
            public string Description { get; set; }
        }


        public class R_GetGeofenceByID : IApiResult<R_GetGeofenceByID.R_GetGeofenceByID_Result>
        {
            /// <summary>
            /// 根据ID获取围栏信息的返回数据
            /// </summary>
            public class R_GetGeofenceByID_Result
            {
                /// <summary>
                /// 围栏ID
                /// </summary>
                public int GeofenceID { get; set; }
                /// <summary>
                /// 围栏名称
                /// </summary>
                public string FenceName { get; set; }
                /// <summary>
                /// 围栏类型 1：多边形，0：圆形
                /// </summary>
                public int FenceType { get; set; }
                /// <summary>
                /// 用户ID
                /// </summary>
                public int UserID { get; set; }
                /// <summary>
                /// 边界坐标，格式：lat,lng|lat,lng|lat,lng  举例：41.489715,123.50642|41.483577,123.493149|41.467728,123.481067|41.474391,123.456519
                /// </summary>
                public int Bounds { get; set; }
                /// <summary>
                /// 用户名称
                /// </summary>
                public int UserName { get; set; }
                /// <summary>
                /// 创建时间
                /// </summary>
                public DateTime Created { get; set; }
            }
        }

        public class R_GetGeofenceByUserID : IApiResult<List<R_GetGeofenceByID.R_GetGeofenceByID_Result>>
        {
             
        }
    }
}
