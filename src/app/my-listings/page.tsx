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
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

  // Bump to re-fetch the listings after an update (no full page reload).
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const email = user?.email;

    if (email) {
      const fetchMyStudios = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/my-studios?email=${encodeURIComponent(email)}`
          );
          if (res.ok && !cancelled) {
            const data = await res.json();
            // Only show listings owned by this user (ownerEmail match).
            setStudios(
              data.filter(
                (studio: Studio) =>
                  studio.hostInfo?.email?.toLowerCase() ===
                  email.toLowerCase()
              )
            );
          }
        } catch (err) {
          console.error("Failed to fetch listings:", err);
          toast.error("Failed to load your studio listings.");
        } finally {
          if (!cancelled) setLoading(false);
        }
      };

      fetchMyStudios();
    } else if (!sessionLoading && !user) {
      router.push("/signin");
    }

    return () => {
      cancelled = true;
    };
  }, [user, sessionLoading, router, refreshTick]);

  // Handle Studio Deletion
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studio/${deleteId}`, {
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-800 dark:bg-amber-500/15 dark:text-amber-400">
              <Building2 className="h-3.5 w-3.5" /> Host Workspace Manager
            </span>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
              My Studio Listings
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your published creative production spaces, rates, and listings
            </p>
          </div>

          <Link href="/add-studio">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2 shadow-sm">
              <CirclePlus className="h-4 w-4" /> Add New Studio
            </Button>
          </Link>
        </div>

        {/* Listings Table */}
        {studios.length > 0 ? (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead>Studio Space</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Hourly Rate</TableHead>
                    <TableHead>Deposit</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studios.map((studio) => (
                    <TableRow key={studio._id} className="group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                            {studio.image && (
                              <img
                                src={studio.image}
                                alt={studio.title}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/studios/${studio._id}`}
                              className="block max-w-xs truncate font-semibold text-sm hover:text-amber-600"
                            >
                              {studio.title}
                            </Link>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground truncate">
                              <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
                              <span className="max-w-[220px] truncate">{studio.location}</span>
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline" className="capitalize font-medium">
                          {studio.category?.replace("-", " ")}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <span className="font-bold text-amber-500">
                          ${studio.rate}/hr
                        </span>
                      </TableCell>

                      <TableCell className="text-sm">
                        ${studio.deposit}
                      </TableCell>

                      <TableCell className="text-sm">
                        {studio.capacity} people
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* View public listing page */}
                          <Link href={`/studios/${studio._id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label="View listing"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>

                          {/* Update — opens the edit dialog */}
                          <EditStudioDialog
                            studio={studio}
                            onUpdated={() => setRefreshTick((t) => t + 1)}
                          />

                          {/* Delete Confirmation Modal */}
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete listing"
                            onClick={() => setDeleteId(studio._id)}
                            className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="items-center text-center pt-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 mb-2">
                <Building2 className="h-8 w-8 text-amber-500" />
              </div>
              <CardTitle className="text-xl font-bold">No studios listed yet</CardTitle>
              <CardDescription className="max-w-sm">
                You haven&apos;t added any studio workspaces to your portfolio yet.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-10">
              <Link href="/add-studio">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold gap-2">
                  <CirclePlus className="h-4 w-4" /> Add Your First Studio
                </Button>
              </Link>
            </CardContent>
          </Card>
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
