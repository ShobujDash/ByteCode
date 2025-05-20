import { prisma } from "@/lib/prisma";
import { Clock, FileText, MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticles from "./recent-atricles";

const BlogDashboard = async () => {
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    }),
    prisma.comment.count(),
  ]);

  return (
    <main className=" md:p-8 m-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-2xl">Blog Dashboard</h1>
          <p>Manage your content and anlytics</p>
        </div>

        <Link href="/dashboard/articles/create">
          <Button>
            {" "}
            <PlusCircle className="h-4 w-4" />
            New Article
          </Button>
        </Link>
      </div>

      {/* quick starts */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Totol Articles
            </CardTitle>
            <FileText className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
            <p className="text-sm text-muted-foreground">+5 form last month</p>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Totol Comments
            </CardTitle>
            <MessageCircle className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-sm text-muted-foreground">
              12 awaiting modaration
            </p>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Avg. Rating Time
            </CardTitle>
            <Clock className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">
              +0.6 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <RecentArticles articles={articles} />
    </main>
  );
};

export default BlogDashboard;
