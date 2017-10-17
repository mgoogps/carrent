using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class LKLocation
	{
		public int LocationID { get; set; }

		public DateTime? LastCommunication { get; set; }

		public DateTime? ServerUtcDate { get; set; }

		public DateTime? DeviceUtcDate { get; set; }

		public DateTime? StopStartUtcDate { get; set; }

		public decimal? Latitude { get; set; }

		public decimal? Longitude { get; set; }

		public decimal? BaiduLat { get; set; }

		public decimal? BaiduLng { get; set; }

		public string Address { get; set; }

		public decimal? Speed { get; set; }

		public decimal? Course { get; set; }

		public string SerialNumber { get; set; }

		public int DeviceID { get; set; }

		public int? DataType { get; set; }

		public string DataContext { get; set; }

		public int? Status { get; set; }

		public DateTime? SOSTime { get; set; }

		public DateTime? ExceptionTime { get; set; }

		public decimal? Distance { get; set; }

		public decimal? OLat { get; set; }

		public decimal? OLng { get; set; }

		public int? IsStop { get; set; }

		public int? IsOffline { get; set; }

		public int? Exception { get; set; }

		public string CarStatus { get; set; }

		public decimal? ToDayDistance { get; set; }

	}
}
