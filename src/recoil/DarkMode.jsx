import { atom, selector } from "recoil";

const DarkMode = atom({
	key: "darkmode",
	default: selector({
		key: "default-darkmode",
		get: () => {
			const temp = localStorage.getItem("darkmode");
			if(!!temp ) return temp
			return 'light'
		},
	}),
});

export { DarkMode };

