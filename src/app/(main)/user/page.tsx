"use client";

import { logout } from "@/actions/auth/auth";
import { Button } from "@/components/ui/button";

export default function User() {
  const onSubmit = async () => {
    logout();
  };
  return (
    <div>
      <Button onClick={onSubmit} className="bg-primary">
        Logout
      </Button>
    </div>
  );
}
