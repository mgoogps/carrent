using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Entity.Monitor
{
    public class DeviceList
    {
        /// <summary>
        /// 设备ID
        /// </summary>
        public int DeviceID { get; set; }

        private string _SerialNumber;
        /// <summary>
        /// 设备IMEI号
        /// </summary>
        public string SerialNumber { get { return _SerialNumber; } set { _SerialNumber = value ?? string.Empty; } }

        private string _DeviceName;
        /// <summary>
        /// 设备名称
        /// </summary>
        public string DeviceName { get { return _DeviceName; } set { _DeviceName = value ?? string.Empty; } }
        /// <summary>
        /// 与平台通信时间
        /// </summary>
        public DateTime LastCommunication { get; set; }

        private string _DataContext;
        /// <summary>
        /// 第一位数   0 - ACC关    ，1 - ACC开
        /// 第二位数   0 - 撤防     ，1 - 设防
        /// 第三位数   0 - 未刹车   ，1 - 刹车
        /// 第四位数   0 - 主电断开 ，1 - 主电连接
        /// 如果有第五位数，则代表设备电量(没有可忽略)。 
        /// </summary>
        public string DataContext { get { return _DataContext; } set { _DataContext = value ?? string.Empty; } }

        /// <summary>
        /// 当前速度
        /// </summary>
        public double Speed { get; set; }
        /// <summary>
        /// 分组ID
        /// </summary>
        public int GroupID { get; set; }
        /// <summary>
        /// 到期时间
        /// </summary>
        public DateTime HireExpireDate { get; set; }
        /// <summary>
        /// 停止时间
        /// </summary>
        public int? StopTime { get; set; }
        /// <summary>
        /// 该设备未读报警条数
        /// </summary>
        public int ExceptionCount { get; set; }

        /// <summary>
        /// 设备当前位置的纬度
        /// </summary>
        public double Lat { get; set; }
        /// <summary>
        /// 设备当前位置的经度
        /// </summary>
        public double Lng { get; set; }

        private string _Model;
        /// <summary>
        /// 设备型号
        /// </summary>
        public string Model
        {
            get { return _Model; }
            set { _Model = value ?? string.Empty; }
        }
        /// <summary>
        /// 当前状态(1:已租，0:未租)
        /// </summary>
        public int Status { get; set; }

        /// <summary>
        /// GPS设备的状态 (1=在线，2=离线，3=未激活、4=已过期) 
        /// </summary>
        public int GpsStatus { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? OffLineMinute { get; set; }

        /// <summary>
        /// GPS设备当前状态的持续时间(分钟)
        /// </summary>
        public double GpsStatusMinute { get; set; }

        /// <summary>
        /// 是否停止 0：运动，1：停止
        /// </summary>
        public int IsStop { get; set; }
    }
}
