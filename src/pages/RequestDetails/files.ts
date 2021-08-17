import { RequestFile } from "types/requests";

const files: RequestFile[] = [
	{
		path: "1617608776298_scaled_2f315504-86cc-4715-9593-9f7327c837ed2357368832170283019.jpg",
		latitude: 40.5935836,
		longitude: 49.6765378,
		address: "Sumqayıt şəhər ərazi vahidi,20 Yanvar",
		distance: 5.601983759110586,
		sameAddress: true,
		type: "IMAGE",
		uploadDateStr: "05.04.2021 11:46:16",
	},
	{
		path: "1617608764464_VID_2021-04-05_11-45-55.mp4",
		latitude: 40.5933495,
		longitude: 49.6766739,
		address: "Sumqayıt, Sumqayıt şəhəri, 20 Yanvar küçəsi, 14cü məhəllə, 112C",

		distance: 23.103337348812563,
		sameAddress: true,
		type: "VIDEO",
		uploadDateStr: "05.04.2021 11:46:04",
	},
	{
		path: "1617608666456_scaled_418a0a5f-441d-4b3a-8e15-174e10c28bd11932182758904773442.jpg",
		latitude: 40.5935446,
		longitude: 49.6765798,
		address: "Sumqayıt şəhər ərazi vahidi,20 Yanvar",

		distance: 0,
		sameAddress: true,
		type: "IMAGE",
		uploadDateStr: "05.04.2021 11:44:26",
	},
	{
		path: "1628499199839_0b8032f0-e08f-41f5-a4ac-a53f4c742487.jpg",
		latitude: 40.5833486,
		longitude: 49.6674168,
		address: "Sumqayıt, Sumqayıt şəhəri, Bakı küçəsi, 15/13",
		executive: {
			id: 207,
			name: "Sumqayıt şəhər İcra Hakimiyyəti",
			email: "mail@sumqayit-ih.gov.az",
			phoneNumber: "+994186559131",
			address: "AZ 5000, Azərbaycan Respublikası, Sumqayıt ş.,  Azərbaycan prospekti, 9",
			region: {
				id: 21,
				name: "Sumqayıt şəhəri",
			},
			type: {
				id: 3,
				name: "İcra Hakimiyyəti",
				label: "EXECUTIVE",
			},
		},
		distance: 0.44734036194069854,
		sameAddress: true,
		type: "IMAGE",
		uploadDateStr: "09.08.2021 12:53:20",
		madeByMobileApp: true,
	},
	{
		path: "1628499190654_0d10d6b4-dccf-45c1-ae56-51d65b05b91b.jpg",
		latitude: 40.5833447,
		longitude: 49.6674181,
		address: "Sumqayıt, Sumqayıt şəhəri, Bakı küçəsi, 15/13",
		executive: {
			id: 207,
			name: "Sumqayıt şəhər İcra Hakimiyyəti",
			email: "mail@sumqayit-ih.gov.az",
			phoneNumber: "+994186559131",
			address: "AZ 5000, Azərbaycan Respublikası, Sumqayıt ş.,  Azərbaycan prospekti, 9",
			region: {
				id: 21,
				name: "Sumqayıt şəhəri",
			},
			type: {
				id: 3,
				name: "İcra Hakimiyyəti",
				label: "EXECUTIVE",
			},
		},
		distance: 0,
		sameAddress: true,
		type: "IMAGE",
		uploadDateStr: "09.08.2021 12:53:10",
		madeByMobileApp: true,
	},
	{
		path: "1628499129617_e3b10f8b-6819-4686-8da1-dcc92f389ea6.m4a",
		sameAddress: true,
		type: "AUDIO",
		length: 19,
		uploadDateStr: "09.08.2021 12:52:09",
		madeByMobileApp: true,
	},
];

export default files;
