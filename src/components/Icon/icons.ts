import { ReactComponent as setting } from "./svg/setting.svg";
import { ReactComponent as arrowRight } from "./svg/arrow-right.svg";
import { ReactComponent as retweet } from "./svg/retweet.svg";
import { ReactComponent as rollback } from "./svg/rollback.svg";
import { ReactComponent as picCenter } from "./svg/pic-center.svg";
import { ReactComponent as appStore } from "./svg/app-store.svg";
import { ReactComponent as database } from "./svg/database.svg";
import { ReactComponent as build } from "./svg/build.svg";
import { ReactComponent as close } from "./svg/close.svg";
import { ReactComponent as cluster } from "./svg/cluster.svg";
import { ReactComponent as noImage } from "./svg/no-image.svg";
import { ReactComponent as users } from "./svg/users.svg";
import { ReactComponent as organization } from "./svg/organization.svg";
import { ReactComponent as categories } from "./svg/categories.svg";
import { ReactComponent as plus } from "./svg/plus.svg";
import { ReactComponent as edit } from "./svg/edit.svg";
import { ReactComponent as trash } from "./svg/trash.svg";
import { ReactComponent as backTo } from "./svg/back-to.svg";
import { ReactComponent as company } from "./svg/company.svg";
import { ReactComponent as leftArrow } from "./svg/left-arrow.svg";
import { ReactComponent as back } from "./svg/back.svg";
import { ReactComponent as marker } from "./svg/marker.svg";
import { ReactComponent as headset } from "./svg/headset.svg";
import { ReactComponent as userAccount } from "./svg/user-account.svg";
import { ReactComponent as categorize } from "./svg/categorize.svg";
import { ReactComponent as doubleLeft } from "./svg/double-left.svg";
import { ReactComponent as doubleRight } from "./svg/double-right.svg";
import { ReactComponent as doubleUp } from "./svg/double-up.svg";
import { ReactComponent as doubleDown } from "./svg/double-down.svg";
import { ReactComponent as expand } from "./svg/expand.svg";
import { ReactComponent as compress } from "./svg/compress.svg";

const icons: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
	setting,
	"arrow-right": arrowRight,
	retweet,
	rollback,
	"pic-center": picCenter,
	appstore: appStore,
	database,
	build,
	close,
	cluster,
	"no-image": noImage,
	users,
	organization,
	categories,
	plus,
	edit,
	trash,
	"back-to": backTo,
	company,
	"left-arrow": leftArrow,
	back,
	marker,
	headset,
	"user-account": userAccount,
	categorize,
	"double-left": doubleLeft,
	"double-right": doubleRight,
	"double-up": doubleUp,
	"double-down": doubleDown,
	expand,
	compress,
};

export default icons;
