using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class ExceptionMessage
	{
		public int ExceptionID { get; set; }

		public string SerialNumber { get; set; }

		public int? DeviceID { get; set; }

		public int? GeoFenceID { get; set; }

		public int? NotificationType { get; set; }

		public string Message { get; set; }

		public DateTime? Created { get; set; }

		public int? Deleted { get; set; }

		public DateTime? ClearDate { get; set; }

		public int? ClearBy { get; set; }

		public string Note { get; set; }

		public decimal? OLat { get; set; }

		public decimal? OLng { get; set; }

		public decimal? Lat { get; set; }

		public decimal? Lng { get; set; }

		public decimal? BaiduLat { get; set; }

		public decimal? BaiduLng { get; set; }

		public int? Power { get; set; }

		public string Address { get; set; }

		public int? AccON { get; set; }

		public int? EngineON { get; set; }

		public string OtherStatus { get; set; }

		public int? GSM { get; set; }

		public DateTime? DeviceUTCTime { get; set; }

	}
}
