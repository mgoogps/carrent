//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace Mgoo.CarRent.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class ExceptionMessage
    {
        public int ExceptionID { get; set; }
        public string SerialNumber { get; set; }
        public Nullable<int> DeviceID { get; set; }
        public Nullable<int> GeoFenceID { get; set; }
        public Nullable<int> NotificationType { get; set; }
        public string Message { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public Nullable<int> Deleted { get; set; }
        public Nullable<System.DateTime> ClearDate { get; set; }
        public Nullable<int> ClearBy { get; set; }
        public string Note { get; set; }
        public Nullable<decimal> OLat { get; set; }
        public Nullable<decimal> OLng { get; set; }
        public Nullable<decimal> Lat { get; set; }
        public Nullable<decimal> Lng { get; set; }
        public Nullable<decimal> BaiduLat { get; set; }
        public Nullable<decimal> BaiduLng { get; set; }
        public Nullable<int> Power { get; set; }
        public string Address { get; set; }
        public Nullable<bool> AccON { get; set; }
        public Nullable<bool> EngineON { get; set; }
        public string OtherStatus { get; set; }
        public Nullable<int> GSM { get; set; }
        public Nullable<System.DateTime> DeviceUTCTime { get; set; }
    }
}
