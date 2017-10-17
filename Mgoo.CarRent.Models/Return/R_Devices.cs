using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Return
{
    public class R_Devices
    {
        public class GetDeviceListPage
        {
            /// <summary>
            /// 设备分页列表Result数据
            /// </summary>
            public class GetDeviceListPage_Result : R_Paging
            {
                /// <summary>
                /// 返回数据的集合
                /// </summary>
                public List<GetDeviceListPage_List> list { get; set; }
                /// <summary>
                /// 列表属性说明
                /// </summary>
                public class GetDeviceListPage_List
                {
                    /// <summary>
                    /// 设备ID
                    /// </summary>
                    public int DeviceID { get; set; }
                    /// <summary>
                    /// 流量卡号
                    /// </summary>
                    public string PhoneNum { get; set; }
                    /// <summary>
                    /// 设备名称
                    /// </summary>
                    public string DeviceName { get; set; }
                    /// <summary>
                    /// 分组名称
                    /// </summary>
                    public string GroupName { get; set; }
                    /// <summary>
                    /// 设备IMEI
                    /// </summary>
                    public string SerialNumber { get; set; }
                    /// <summary>
                    /// 创建时间
                    /// </summary>
                    public DateTime Created { get; set; }
                    /// <summary>
                    /// 描述
                    /// </summary>
                    public string Description { get; set; }
                    /// <summary>
                    /// 所属用户ID
                    /// </summary>
                    public int UserID { get; set; }
                    /// <summary>
                    /// 所属用户名
                    /// </summary>
                    public string UserName { get; set; }
                    /// <summary>
                    /// 多少分钟算离线
                    /// </summary>
                    public int SortOrder { get; set; }
                    /// <summary>
                    /// 通信时间
                    /// </summary>
                    public DateTime? LastCommunication { get; set; }
                    /// <summary>
                    /// 行号
                    /// </summary>
                    public int RowIndex { get; set; }
                }
            }
        }
        /// <summary>
        /// 根据设备ID获取设备信息返回值
        /// </summary>
        public class GetDevice_Result
        {
            /// <summary>
            /// 设备ID
            /// </summary>
            public int DeviceID { get; set; }
            /// <summary>
            /// 设备名称
            /// </summary>
            public string DeviceName { get; set; }
            /// <summary>
            /// 设备IMEI
            /// </summary>
            public string SerialNumber { get; set; }
            /// <summary>
            /// 通信时间
            /// </summary>
            public DateTime? LastCommunication { get; set; }
            /// <summary>
            /// 方向角
            /// </summary>
            public decimal Course { get; set; }
            /// <summary>
            /// 是否是运动的
            /// </summary>
            public int IsStop { get; set; }
            /// <summary>
            /// 状态
            /// </summary>
            public int Status { get; set; }
            /// <summary>
            /// GPS状态
            /// </summary>
            public string DataContext { get; set; }
            /// <summary>
            /// 速度
            /// </summary>
            public decimal Speed { get; set; }

            /// <summary>
            /// 设备当前位置的纬度
            /// </summary>
            public decimal Lat { get; set; }
            /// <summary>
            /// 设备当前位置的经度
            /// </summary>
            public decimal Lng { get; set; } 
        }
    }
}
