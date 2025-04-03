import styles from "./Sidebar.module.css";
import GenresDropdown from "../genresDropdown/GenresDropdown";

export default function Sidebar() {
    return (
        <div className="flex-column sidebar-wrapper p-3">
            <GenresDropdown />
        </div>
    )
}

