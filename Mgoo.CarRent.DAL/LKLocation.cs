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
    
    public partial class LKLocation
    {
        public int LocationID { get; set; }
        public System.DateTime LastCommunication { get; set; }
        public Nullable<System.DateTime> ServerUtcDate { get; set; }
        public Nullable<System.DateTime> DeviceUtcDate { get; set; }
        public Nullable<System.DateTime> StopStartUtcDate { get; set; }
        public Nullable<decimal> Latitude { get; set; }
        public Nullable<decimal> Longitude { get; set; }
        public Nullable<decimal> BaiduLat { get; set; }
        public Nullable<decimal> BaiduLng { get; set; }
        public string Address { get; set; }
        public Nullable<decimal> Speed { get; set; }
        public Nullable<decimal> Course { get; set; }
        public string SerialNumber { get; set; }
        public int DeviceID { get; set; }
        public Nullable<int> DataType { get; set; }
        public string DataContext { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<System.DateTime> SOSTime { get; set; }
        public Nullable<System.DateTime> ExceptionTime { get; set; }
        public Nullable<decimal> Distance { get; set; }
        public Nullable<decimal> OLat { get; set; }
        public Nullable<decimal> OLng { get; set; }
        public Nullable<int> IsStop { get; set; }
        public Nullable<int> IsOffline { get; set; }
        public Nullable<int> Exception { get; set; }
        public string CarStatus { get; set; }
        public Nullable<decimal> ToDayDistance { get; set; }
    }
}