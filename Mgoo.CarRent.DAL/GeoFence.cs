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
    
    public partial class GeoFence
    {
        public int GeofenceID { get; set; }
        public string FenceName { get; set; }
        public Nullable<decimal> Latitude { get; set; }
        public Nullable<decimal> Longitude { get; set; }
        public Nullable<bool> Entry { get; set; }
        public Nullable<bool> Exit { get; set; }
        public Nullable<decimal> Radius { get; set; }
        public Nullable<int> IsInclusion { get; set; }
        public Nullable<System.DateTime> Created { get; set; }
        public Nullable<bool> Deleted { get; set; }
        public Nullable<decimal> Lat1 { get; set; }
        public Nullable<decimal> Lng1 { get; set; }
        public Nullable<int> FenceType { get; set; }
        public Nullable<decimal> Width { get; set; }
        public Nullable<int> UserID { get; set; }
        public Nullable<int> DeviceID { get; set; }
        public string Description { get; set; }
        public Nullable<decimal> SouthWestLat { get; set; }
        public Nullable<decimal> SouthWestLng { get; set; }
        public Nullable<decimal> NorthEastLat { get; set; }
        public Nullable<decimal> NorthEastLng { get; set; }
        public string Bounds { get; set; }
        public string BoundBindIds { get; set; }
    }
}
