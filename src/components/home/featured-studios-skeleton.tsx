// import { Skeleton } from "@/components/ui/skeleton";

// /** Loading placeholder shown while the featured studios query resolves. */
// export function FeaturedStudiosSkeleton() {
//   return (
//     <section
//       aria-busy="true"
//       aria-label="Loading featured studios"
//       className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20"
//     >
//       <div className="flex flex-wrap items-end justify-between gap-4">
//         <div className="space-y-3">
//           <Skeleton className="h-4 w-28" />
//           <Skeleton className="h-9 w-80 max-w-full" />
//           <Skeleton className="h-4 w-96 max-w-full" />
//         </div>
//         <Skeleton className="h-8 w-36" />
//       </div>

//       <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {Array.from({ length: 6 }).map((_, index) => (
//           <div
//             key={index}
//             className="overflow-hidden rounded-2xl ring-1 ring-foreground/10"
//           >
//             <Skeleton className="aspect-[4/3] rounded-none" />
//             <div className="space-y-3 p-4">
//               <Skeleton className="h-5 w-3/4" />
//               <Skeleton className="h-4 w-1/2" />
//               <div className="flex items-center justify-between border-t border-border pt-3">
//                 <Skeleton className="h-6 w-16" />
//                 <Skeleton className="h-7 w-24" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { Skeleton } from "@/components/ui/skeleton";

/** Loading placeholder shown while the featured studios query resolves. */
export function FeaturedStudiosSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading featured studios"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-9 w-80 max-w-full" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-8 w-36" />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl ring-1 ring-foreground/10"
          >
            <Skeleton className="aspect-[4/3] rounded-none" />
            <div className="space-y-3 p-4">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center justify-between border-t border-border pt-3">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-7 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}