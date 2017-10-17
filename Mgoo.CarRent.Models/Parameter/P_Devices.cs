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
    public class P_Devices
    {
        /// <summary>
        /// 当接口只有一个deviceID的时候
        /// </summary>
        public class PDevicesByDeviceID :  IParameterEntity
        {
            /// <summary>
            /// 设备ID
            /// </summary>
            [Required(), Max(int.MaxValue), Min(1)]
            public int deviceid { get; set; }

            IApiResult IParameterEntity.Validate()
            {
                return null;
            }
        }

        /// <summary>
        /// 申请租车参数
        /// </summary>
        public class P_CarRequest :  IParameterEntity
        {
            /// <summary>
            /// 设备ID
            /// </summary>
            [Required(), Max(int.MaxValue), Min(1)]
            public int deviceid { get; set; }
            /// <summary>
            /// 手机号码
            /// </summary>
            [Required, MinLength(5), MaxLength(16)]
            public string phone { get; set; }
            /// <summary>
            /// 验证码
            /// </summary>
            [Required(ErrorMessage = "6 digits"), Min(100000), Max(999999)]
            public int code { get; set; }

            IApiResult IParameterEntity.Validate()
            {
                //if (code < 100000 || code > 999999)
                //{
                //    return new IApiResult() { code = StatusCode.parameterError, message = "code error..." };
                //}
                if (deviceid == 0)
                {
                    return new IApiResult() { code = StatusCode.parameterError, message = "deviceid error." };
                }
                var cacheCode=  CacheHelper.Get<int>(CarRent.Common.Lib.Config.SMS.PREFIX+phone);
                if (code != cacheCode)
                {
                   // return new IApiResult() { code = StatusCode.parameterError, message = "code error." };
                }
                return null;
            }
        }

        /// <summary>
        /// 获取申请租车列表 参数
        /// </summary>
        public class PGetCarRequest : IParameterEntity
        {
            /// <summary>
            /// 用户ID
            /// </summary>
            [Required(), Max(int.MaxValue), Min(1)]
            public int userid { get; set; }

            IApiResult IParameterEntity.Validate()
            {
                if (userid > 0)
                {
                    return null;
                }
                return new IApiResult() { code = StatusCode.parameterError, message = "userid error..." };
            }
        }

        /// <summary>
        /// 查询设备列表分页需要的参数
        /// </summary>
        public class P_GetDeviceList : AbstractPaging, IParameterEntity
        {
            /// <summary>
            /// 用户ID
            /// </summary>
            [Range(1, int.MaxValue)]
             public int? userid { get; set; }
            
            /// <summary>
            /// 查询的开始时间
            /// </summary>
            public DateTime? start_date { get; set; }
           
            /// <summary>
            /// 查询的结束时间
            /// </summary>
            public DateTime? end_date { get; set; }

            /// <summary>
            /// 查询的关键字
            /// </summary>
            [MaxLength(30)]
            public string  keyword { get; set; }

            public IApiResult Validate()
            {
                return null;
            }
        }
        /// <summary>
        /// 修改设备信息
        /// </summary>
        public class P_UpdateDeviceInfo : IParameterEntity
        {
            /// <summary>
            /// 设备ID
            /// </summary>
           [Required(), Range(1,int.MaxValue)]
           public int deviceid { get; set; }
            /// <summary>
            /// 设备名称
            /// </summary>
            [Required,MinLength(1),MaxLength(30)]
            public string devicename { get; set; }
            /// <summary>
            /// 分组ID
            /// </summary>
            public int groupid { get; set; }
        
            /// <summary>
            /// 备注
            /// </summary>
            public string description { get; set; }

            public IApiResult Validate()
            {
                return null;
            }
        }
        /// <summary>
        /// 删除一条设备信息记录页面传递的参数
        /// </summary>
        public class P_DelDevice : IParameterEntity
        {
            [Required(), Range(1, int.MaxValue)]
            public int id { get; set; }
            public IApiResult Validate()
            {
               return null;
            }
        }
        /// <summary>
        /// 添加设备信息
        /// </summary>
        public class P_AddDevice : IParameterEntity
        {
         
            /// <summary>
            /// 用户ID
            /// </summary>
            [Required(), Range(1, int.MaxValue)]
            public int  userid{ get; set; }
            /// <summary>
            /// 分组ID
            /// </summary>
            public int groupid { get; set; }
            /// <summary>
            /// 设备IMEI号
            /// </summary>
            [Required(), MinLength(1), MaxLength(30)]
            public string imei { get; set; }
            /// <summary>
            /// 流量卡号
            /// </summary>
            [Required(), MinLength(7), MaxLength(30)]
            public string phonenumber { get; set; }
            /// <summary>
            /// 设备名称
            /// </summary>
            [Required(), MinLength(1), MaxLength(30)]
            public string devicename { get; set; }
            /// <summary>
            /// 备注
            /// </summary>
            public string remark { get; set; }

            public IApiResult Validate()
            {
                return null;
            }
        }

        public class P_Import
        {
            /// <summary>
            /// 上传的文件
            /// </summary>
            [Required()]
            public string FileName { get; set; }
        }
        /// <summary>
        /// 批量删除ID（1，4，5格式）
        /// </summary>
        public class P_DelsDevices:IParameterEntity
        {
            /// <summary>
            /// 设备ID
            /// </summary>
            public string deviceid { get; set; }

            public IApiResult Validate()
            {
                return null;
            }
        }
    }
}

