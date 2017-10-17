using System;


namespace Mgoo.CarRent.Models.Entity
{
	[Serializable]
	public class Apps
	{
		public int ID { get; set; }

		public string AppID { get; set; }

		public string AppKey { get; set; }

		public string AppSecret { get; set; }

		public string MasterSecret { get; set; }

		public string PackageName { get; set; }

		public string OS { get; set; }

	}
}
