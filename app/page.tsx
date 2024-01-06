import { Category, Header, Sidebar, VideoGridItem } from '@/components/index';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { videos } from '@/data/videos';

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex max-h-screen flex-col">
        <Header />
        <div className="grow-1 grid grid-cols-[auto,1fr] overflow-auto">
          <Sidebar />
          <div className="overflow-x-hidden px-4 pb-4">
            <Category />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
              {videos.map((video, idx) => (
                <VideoGridItem key={idx} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
