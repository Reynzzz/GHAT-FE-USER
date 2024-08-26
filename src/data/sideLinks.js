export const sideLinks = [
  {
    to: "/dashboard",
    label: "Dashboard",
    userType: ["admin", "User"],
    userCategory : ["Pengajar Dan Guru Jaga","Pengajar"],
    icon: "command",
  },
  {
    to: "/teacher",
    label: "Teacher",
    userType: ["admin"],
    userCategory : ["Pengajar dan Guru Jaga","Pengajar"],
    icon: "user",
  },
  {
    to: "/schedelu",
    label: "Schedelu",
    userType: ["User", "admin"],
    userCategory : ["Pengajar Dan Guru Jaga","Pengajar"],
    icon: "calendar",
  },
  {
    to: "/settings",
    label: "Kelas",
    userType: ["admin"],
    userCategory : ["Pengajar"],
    icon: "settings",
  },
  {
    to: "/validasi",
    label: "Validasi",
    userType: ["User"],
    userCategory : ["Pengajar Dan Guru Jaga"],
    icon: "check-circle",
  },
  {
    to: "/validasi",
    label: "Validasi",
    userType: ["admin"],
    userCategory : ["Pengajar"],
    icon: "check-circle",
  },
];
