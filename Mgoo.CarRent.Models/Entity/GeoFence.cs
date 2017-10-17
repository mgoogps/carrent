using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class GeoFence
	{
		public int GeofenceID { get; set; }

		public string FenceName { get; set; }

		public decimal? Latitude { get; set; }

		public decimal? Longitude { get; set; }

		public int? Entry { get; set; }

		public int? Exit { get; set; }

		public decimal? Radius { get; set; }

		public int? IsInclusion { get; set; }

		public DateTime? Created { get; set; }

		public int? Deleted { get; set; }

		public decimal? Lat1 { get; set; }

		public decimal? Lng1 { get; set; }

		public int? FenceType { get; set; }

		public decimal? Width { get; set; }

		public int? UserID { get; set; }

		public int? DeviceID { get; set; }

		public string Description { get; set; }

		public decimal? SouthWestLat { get; set; }

		public decimal? SouthWestLng { get; set; }

		public decimal? NorthEastLat { get; set; }

		public decimal? NorthEastLng { get; set; }

		public string Bounds { get; set; }

		public string BoundBindIds { get; set; }

	}
}
