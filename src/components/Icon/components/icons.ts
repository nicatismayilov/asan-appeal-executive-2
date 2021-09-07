import { ReactComponent as setting } from "../files/setting.svg";
import { ReactComponent as arrowRight } from "../files/arrow-right.svg";
import { ReactComponent as retweet } from "../files/retweet.svg";
import { ReactComponent as rollback } from "../files/rollback.svg";
import { ReactComponent as picCenter } from "../files/pic-center.svg";
import { ReactComponent as appStore } from "../files/app-store.svg";
import { ReactComponent as database } from "../files/database.svg";
import { ReactComponent as build } from "../files/build.svg";
import { ReactComponent as close } from "../files/close.svg";
import { ReactComponent as cluster } from "../files/cluster.svg";
import { ReactComponent as noImage } from "../files/no-image.svg";
import { ReactComponent as users } from "../files/users.svg";
import { ReactComponent as organization } from "../files/organization.svg";
import { ReactComponent as categories } from "../files/categories.svg";
import { ReactComponent as plus } from "../files/plus.svg";
import { ReactComponent as edit } from "../files/edit.svg";
import { ReactComponent as trash } from "../files/trash.svg";
import { ReactComponent as backTo } from "../files/back-to.svg";
import { ReactComponent as company } from "../files/company.svg";
import { ReactComponent as leftArrow } from "../files/left-arrow.svg";
import { ReactComponent as back } from "../files/back.svg";
import { ReactComponent as marker } from "../files/marker.svg";
import { ReactComponent as headset } from "../files/headset.svg";
import { ReactComponent as userAccount } from "../files/user-account.svg";
import { ReactComponent as categorize } from "../files/categorize.svg";
import { ReactComponent as doubleLeft } from "../files/double-left.svg";
import { ReactComponent as doubleRight } from "../files/double-right.svg";
import { ReactComponent as doubleUp } from "../files/double-up.svg";
import { ReactComponent as doubleDown } from "../files/double-down.svg";
import { ReactComponent as expand } from "../files/expand.svg";
import { ReactComponent as compress } from "../files/compress.svg";
import { ReactComponent as customerSupport } from "../files/customer-support.svg";
import { ReactComponent as timetable } from "../files/timetable.svg";
import { ReactComponent as addProperty } from "../files/add-property.svg";
import { ReactComponent as sortDown } from "../files/sort-down.svg";
import { ReactComponent as sortUp } from "../files/sort-up.svg";
import { ReactComponent as emptyBox } from "../files/empty-box.svg";
import { ReactComponent as arrow } from "../files/arrow.svg";
import { ReactComponent as right } from "../files/right.svg";
import { ReactComponent as left } from "../files/left.svg";
import { ReactComponent as sort } from "../files/sort.svg";
import { ReactComponent as filter } from "../files/filter.svg";
import { ReactComponent as search } from "../files/search.svg";
import { ReactComponent as clearSearch } from "../files/clear-search.svg";
import { ReactComponent as erase } from "../files/erase.svg";
import { ReactComponent as broom } from "../files/broom.svg";
import { ReactComponent as connectionStatusOn } from "../files/connection-status-on.svg";
import { ReactComponent as calendar } from "../files/calendar.svg";
import { ReactComponent as clock } from "../files/clock.svg";
import { ReactComponent as chevronRight } from "../files/chevron-right.svg";
import { ReactComponent as chevronLeft } from "../files/chevron-left.svg";
import { ReactComponent as check } from "../files/check.svg";
import { ReactComponent as horizontalLine } from "../files/horizontal-line.svg";
import { ReactComponent as chevronUp } from "../files/chevron-up.svg";
import { ReactComponent as chevronDown } from "../files/chevron-down.svg";
import { ReactComponent as nearMe } from "../files/near-me.svg";
import { ReactComponent as plusMath } from "../files/plus-math.svg";
import { ReactComponent as subtract } from "../files/subtract.svg";
import { ReactComponent as activityHistory } from "../files/activity-history.svg";
import { ReactComponent as microphone } from "../files/microphone.svg";
import { ReactComponent as videoCall } from "../files/video-call.svg";
import { ReactComponent as play } from "../files/play.svg";
import { ReactComponent as pause } from "../files/pause.svg";
import { ReactComponent as lowVolume } from "../files/low-volume.svg";
import { ReactComponent as mediumVolume } from "../files/medium-volume.svg";
import { ReactComponent as speaker } from "../files/speaker.svg";
import { ReactComponent as mute } from "../files/mute.svg";
import { ReactComponent as settings } from "../files/settings.svg";
import { ReactComponent as mapPin } from "../files/map-pin.svg";

/**
 * Firstly add icon name as string to keys array
 */
const keys = [
	"setting",
	"arrow-right",
	"retweet",
	"rollback",
	"pic-center",
	"appstore",
	"database",
	"build",
	"close",
	"cluster",
	"no-image",
	"users",
	"organization",
	"categories",
	"plus",
	"edit",
	"trash",
	"back-to",
	"company",
	"left-arrow",
	"back",
	"marker",
	"headset",
	"user-account",
	"categorize",
	"double-left",
	"double-right",
	"double-up",
	"double-down",
	"expand",
	"compress",
	"customer-support",
	"timetable",
	"add-property",
	"sort-down",
	"sort-up",
	"empty-box",
	"arrow",
	"right",
	"left",
	"sort",
	"filter",
	"search",
	"clear-search",
	"erase",
	"broom",
	"connection-status-on",
	"calendar",
	"clock",
	"chevron-right",
	"chevron-left",
	"check",
	"horizontal-line",
	"chevron-up",
	"chevron-down",
	"near-me",
	"plus-math",
	"subtract",
	"activity-history",
	"microphone",
	"video-call",
	"play",
	"pause",
	"low-volume",
	"medium-volume",
	"speaker",
	"mute",
	"settings",
	"map-pin",
] as const;

/**
 * After adding icon name to keys array, add icon to the map with appropriate index from keys array
 */
const icons: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
	[keys[0]]: setting,
	[keys[1]]: arrowRight,
	[keys[2]]: retweet,
	[keys[3]]: rollback,
	[keys[4]]: picCenter,
	[keys[5]]: appStore,
	[keys[6]]: database,
	[keys[7]]: build,
	[keys[8]]: close,
	[keys[9]]: cluster,
	[keys[10]]: noImage,
	[keys[11]]: users,
	[keys[12]]: organization,
	[keys[13]]: categories,
	[keys[14]]: plus,
	[keys[15]]: edit,
	[keys[16]]: trash,
	[keys[17]]: backTo,
	[keys[18]]: company,
	[keys[19]]: leftArrow,
	[keys[20]]: back,
	[keys[21]]: marker,
	[keys[22]]: headset,
	[keys[23]]: userAccount,
	[keys[24]]: categorize,
	[keys[25]]: doubleLeft,
	[keys[26]]: doubleRight,
	[keys[27]]: doubleUp,
	[keys[28]]: doubleDown,
	[keys[29]]: expand,
	[keys[30]]: compress,
	[keys[31]]: customerSupport,
	[keys[32]]: timetable,
	[keys[33]]: addProperty,
	[keys[34]]: sortDown,
	[keys[35]]: sortUp,
	[keys[36]]: emptyBox,
	[keys[37]]: arrow,
	[keys[38]]: right,
	[keys[39]]: left,
	[keys[40]]: sort,
	[keys[41]]: filter,
	[keys[42]]: search,
	[keys[43]]: clearSearch,
	[keys[44]]: erase,
	[keys[45]]: broom,
	[keys[46]]: connectionStatusOn,
	[keys[47]]: calendar,
	[keys[48]]: clock,
	[keys[49]]: chevronRight,
	[keys[50]]: chevronLeft,
	[keys[51]]: check,
	[keys[52]]: horizontalLine,
	[keys[53]]: chevronUp,
	[keys[54]]: chevronDown,
	[keys[55]]: nearMe,
	[keys[56]]: plusMath,
	[keys[57]]: subtract,
	[keys[58]]: activityHistory,
	[keys[59]]: microphone,
	[keys[60]]: videoCall,
	[keys[61]]: play,
	[keys[62]]: pause,
	[keys[63]]: lowVolume,
	[keys[64]]: mediumVolume,
	[keys[65]]: speaker,
	[keys[66]]: mute,
	[keys[67]]: settings,
	[keys[68]]: mapPin,
};

export type IconName = typeof keys[number];

export default icons;
