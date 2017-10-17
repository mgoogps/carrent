using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class MobileAppInfo
	{
		public int ID { get; set; }

		public int? UserID { get; set; }

		public int? AppsID { get; set; }

		public string ClientID { get; set; }

		public string Token { get; set; }

		public string Model { get; set; }

		public string Vendor { get; set; }

		public string OS { get; set; }

		public string OSVersion { get; set; }

		public string IMEI { get; set; }

		public string UUID { get; set; }

		public string IMSI { get; set; }

		public string Resolution { get; set; }

		public string DPI { get; set; }

		public DateTime? Created { get; set; }

		public DateTime? LastDate { get; set; }

		public string APPVersion { get; set; }

	}
}
