"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updatePersonalInfo } from "@/store/slices/builder-slice";

export function PersonalInfoForm() {
  const dispatch = useAppDispatch();

  const personalInfo = useAppSelector(
    (state) => state.builder.resume.personalInfo,
  );

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Personal Information
        </h2>

        <p className="text-sm text-muted-foreground">
          Add your contact information.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>

          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) =>
              dispatch(
                updatePersonalInfo({
                  fullName: e.target.value,
                }),
              )
            }
            placeholder="John Doe"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) =>
                dispatch(
                  updatePersonalInfo({
                    email: e.target.value,
                  }),
                )
              }
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>

            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) =>
                dispatch(
                  updatePersonalInfo({
                    phone: e.target.value,
                  }),
                )
              }
              placeholder="+1 123 456 7890"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>

          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) =>
              dispatch(
                updatePersonalInfo({
                  location: e.target.value,
                }),
              )
            }
            placeholder="Bengaluru, India"
          />
        </div>
      </div>
    </section>
  );
}