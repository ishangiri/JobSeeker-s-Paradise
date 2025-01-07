"use client";

import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LoginDialogProps {
  onClick: () => void;
}

export function LoginDialog  ({ onClick } : LoginDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-slate-700 text-white hover:bg-slate-900 transition-colors rounded-xl px-6 py-2 text-sm">
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-200  border-none  ">
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>
            You need to log in to view the full details of this job or apply.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onClick} className="bg-slate-700 text-white hover:bg-slate-900 transition-colors rounded-lg">
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
