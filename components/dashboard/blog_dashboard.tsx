import { FileText, MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticles from "./recent-atricles";

const BlogDashboard = () => {
//  const [articles, totalComments] = await Promise.all([
//    prisma.articles.findMany({
//      orderBy: {
//        createdAt: "desc",
//      },
//      include: {
//        comments: true,
//        author: {
//          select: {
//            name: true,
//            email: true,
//            imageUrl: true,
//          },
//        },
//      },
//    }),
//    prisma.comment.count(),
//  ]);


  return (
    <main className="flex-1 p-2 md:p-8">
      <div className="flex justify-between items-center mb-8">
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
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Totol Articles
            </CardTitle>
            <FileText className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">+5 form last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Totol Comments
            </CardTitle>
            <MessageCircle className="w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">
              12 awaiting modaration
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Avg. Rating Time
            </CardTitle>
            <FileText className="w-4 h-4" />
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
      <RecentArticles/>

    </main>
  );
};

export default BlogDashboard;
