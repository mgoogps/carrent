using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mgoo.CarRent.Models.Entity
{
    [Serializable]
    public class Message
    {

        /// <summary>
        /// 属性报警消息ID
        /// </summary>
        public int ExceptionID { get; set; }
        /// <summary>
        /// 属性报警消息类型
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        ///属性 报警时间
        /// </summary>
        public DateTime Created { get; set; }
        /// <summary>
        ///  属性 设备ID
        /// </summary>
        public int? DeviceID { get; set; }
        /// <summary>
        /// 属性 用户ID
        /// </summary>
        public int? UserID { get; set; }
        /// <summary>
        ///属性 设备名称
        /// </summary>
        public string  DeviceName { get; set; }
        /// <summary>
        ///属性 设备IMEI号
        /// </summary>
        public string SerialNumber { get; set; }
    }
}
