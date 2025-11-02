import { type User } from "@/types";
import { calculateAge } from "@/utils/age-calculator";

export const MOCK_USERS: User[] = [
  {
    email: "sarah.johnson@example.com",
    name: "Sarah Johnson",
    username: "sarah.johnson",
    dp: "https://i.pravatar.cc/150?img=12",
    dob: new Date(2008, 5, 15).toISOString().split("T")[0], // Age 16
    age: 16,
    gender: "Female",
    bloodType: "O+",
    genotype: "AA",
  },
  {
    email: "michael.chen@example.com",
    name: "Michael Chen",
    username: "michael.chen",
    dp: "https://i.pravatar.cc/150?img=33",
    dob: new Date(2000, 2, 8).toISOString().split("T")[0], // Age 24
    age: 24,
    gender: "Male",
    bloodType: "A+",
    genotype: "AS",
  },
  {
    email: "emily.davis@example.com",
    name: "Emily Davis",
    username: "emily.davis",
    dp: "https://i.pravatar.cc/150?img=47",
    dob: new Date(1988, 8, 22).toISOString().split("T")[0], // Age 36
    age: 36,
    gender: "Female",
    bloodType: "B+",
    genotype: "AA",
  },
].map((user) => ({
  ...user,
  age: calculateAge(user.dob),
}));
