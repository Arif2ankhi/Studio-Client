"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Building2,
  Trash2,
  MapPin,
  CirclePlus,
  Loader2,
  AlertTriangle,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import EditStudioDialog from "@/components/EditStudioDialog";

interface Studio {
  _id: string;
  title: string;
  category: string;
  capacity: number;
  location: string;
  overview: string;
  amenities: string[];
  rate: number;
  deposit: number;
  image: string;
  hostInfo: {
    name: string;
    email: string;
  };
}

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete Confirmation Modal State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetchMyStudios() {
      if (!user?.email) return;

      try {
        const res = await fetch(
          `http://localhost:8000/my-studios?email=${encodeURIComponent(user.email)}`
        );
        if (res.ok) {
          const data = await res.json();
          setStudios(data);
        }
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        toast.error("Failed to load your studio listings.");
      } finally {
        setLoading(false);
      }
    }

    if (user?.email) {
      fetchMyStudios();
    } else if (!sessionLoading && !user) {
      router.push("/signin");
    }
  }, [user, sessionLoading, router]);

  // Handle Studio Deletion
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:8000/studio/${deleteId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Studio deleted successfully!");
        setStudios((prev) => prev.filter((s) => s._id !== deleteId));
      } else {
        toast.error("Failed to delete studio.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-sm text-muted-foreground">Loading your studio spaces...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              My Studio Listings
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage, update, and track spaces listed by <span className="font-semibold text-foreground">{user?.email}</span>
            </p>
          </div>

          <Link href="/add-studio">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2 shadow-sm">
              <CirclePlus className="h-4 w-4" /> Add New Studio
            </Button>
          </Link>
        </div>

        {/* Listings Display */}
        {studios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio) => (
              <Card key={studio._id} className="overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-black/70 text-white capitalize backdrop-blur">
                    {studio.category?.replace("-", " ")}
                  </Badge>
                </div>

                <CardContent className="p-5 space-y-4">
                  <div>
                    <h2 className="font-bold text-lg leading-snug truncate">{studio.title}</h2>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1 truncate">
                      <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                      {studio.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-b py-3 text-xs text-muted-foreground">
                    <div>
                      <span className="text-base font-bold text-foreground">${studio.rate}</span>
                      <span> / hour</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <Users className="h-3.5 w-3.5" />
                      <span>{studio.capacity} guests</span>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="flex items-center gap-2 pt-1">
                    {/* Integrated Edit Dialog */}
                    <div className="flex-1">
                      <EditStudioDialog studio={studio} />
                    </div>

                    {/* Delete Trigger Button */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(studio._id)}
                      className="gap-1.5 text-xs font-semibold px-3"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-card">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-bold">No studios listed yet</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              You haven't added any studio workspaces to your portfolio yet.
            </p>
            <Link href="/add-studio" className="mt-4">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2">
                <CirclePlus className="h-4 w-4" /> Add Your First Studio
              </Button>
            </Link>
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" /> Confirm Deletion
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm">
              Are you sure you want to permanently remove this studio listing? This action cannot be undone and will remove the document from MongoDB.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 pt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDeleteConfirm}
              className="gap-1.5 font-semibold"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}