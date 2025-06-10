// CustomMarkerIcon.tsx
import { divIcon } from "leaflet";

export const CustomMarkerIcon = ({ photoUrl }) => {
  return divIcon({
    className: "custom-marker-icon",
    html: `
      <div class="marker-img-wrapper">
        <img src="${photoUrl}" class="marker-img" />
        <div class="marker-pointer"></div>
      </div>
    `,
    iconSize: [48, 60],
    iconAnchor: [24, 60],
  });
};