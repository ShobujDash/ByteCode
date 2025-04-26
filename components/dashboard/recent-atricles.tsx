"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import type { Prisma } from "@prisma/client";


// type RecentArticlesProps = {
//   articles: Prisma.ArticlesGetPayload<{
//     include: {
//       comments: true;
//       author: {
//         select: {
//           name: true;
//           email: true;
//           imageUrl: true;
//         };
//       };
//     };
//   }>[];
// };


// const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
const RecentArticles= () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All →
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">sdlkfjasd</TableCell>
              <TableCell>
                <Badge className="rounded-full text-xs bg-green-100 text-green-800">
                  Published
                </Badge>
              </TableCell>
              <TableCell>5</TableCell>
              <TableCell>23 April</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link href={`/dashboard/articles/${5}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <DeleteButton/>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentArticles;


const DeleteButton = () => {
  return (
    <form>
      <Button variant={'ghost'} size={"sm"} type="submit">Delete</Button>
    </form>
  )
}
