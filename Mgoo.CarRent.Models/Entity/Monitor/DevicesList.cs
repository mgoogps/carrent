using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Entity.Monitor
{ 
    public class DevicesList
    {
        /// <summary>
        /// 设备ID
        /// </summary>
        public int DeviceID { get; set; }

        private string _SerialNumber;
        /// <summary>
        /// IMEI号
        /// </summary>
        public string SerialNumber { get { return _SerialNumber; } set { _SerialNumber = value ?? string.Empty; } }
        /// <summary>
        /// 设备名称
        /// </summary>
        private string _DeviceName; public string DeviceName { get { return _DeviceName; } set { _DeviceName = value ?? string.Empty; } }

        /// <summary>
        /// 分组ID
        /// </summary>
        public int GroupID { get; set; }

        private string _GroupName;
        /// <summary>
        /// 分组名称
        /// </summary>
        public string GroupName { get { return _GroupName; } set { _GroupName = value ?? string.Empty; } }

        /// <summary>
        /// 所属用户id
        /// </summary>
        public int UserID { get; set; }

        private string _Username;
        /// <summary>
        /// 所属用户名称
        /// </summary>
        public string Username { get { return _Username; } set { _Username = value ?? string.Empty; } }

        /// <summary>
        /// 通信时间
        /// </summary>
        public DateTime LastCommunication { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public int Status { get; set; }

        public Double Speed { get; set; }

        private string _DataContext; public string DataContext { get { return _DataContext; } set { _DataContext = value ?? string.Empty; } }

        public Double Course { get; set; }

        private string _Icon; public string Icon { get { return _Icon; } set { _Icon = value ?? string.Empty; } }

        public DateTime DeviceUtcDate { get; set; }

        public int StopTime { get; set; }

        private string _CarImg; public string CarImg { get { return _CarImg; } set { _CarImg = value ?? string.Empty; } }

        private string _Model; public string Model { get { return _Model; } set { _Model = value ?? string.Empty; } }

        private string _DataText; public string DataText { get { return _DataText; } set { _DataText = value ?? string.Empty; } }

        public int OfflineTime { get; set; }

        public int DataType { get; set; }

        public DateTime StopStartUtcDate { get; set; }

        public DateTime HireExpireDate { get; set; }

        public Double Lat { get; set; }

        public Double Lng { get; set; }

        public int OffLineMi { get; set; }

    }


}
