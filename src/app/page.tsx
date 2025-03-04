"use client";
import { useState, useEffect, useMemo } from "react";
import Loader from "@/Components/loader";
import { VortexDemo } from "@/Components/vortex";
import Image from "next/image";
import { FloatingDockDemo } from "@/Components/dock";
import "@/styles/fonts.css";
import { Pagination } from "@heroui/pagination";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { ThreeDCardDemo } from "@/Components/card-project";
import { LampDemo } from "@/Components/lamp";
import BackToTop from "@/Components/backtotop";

export default function Home() {
  // All hooks are called unconditionally at the top
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  useEffect(() => {
    // Simulate a loading delay (adjust as needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Disable right-click
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    // Block shortcuts (F12, Ctrl+Shift+I/J/U, etc.)
    const blockShortcuts = (e: KeyboardEvent) => {
      if (
        ["F12", "I", "J", "U"].some(key => 
          (e.ctrlKey && e.shiftKey && e.key === key) || (e.ctrlKey && e.key === key)
        )
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", blockShortcuts);

    // Show Back-to-Top button when scrolled down
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", blockShortcuts);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const githubPrefix = "https://github.com/CuriousHet/";
  const projectNames = [
    "Golang",
    "Zillow-ETL-Pipeline",
    "AWS-Unstructured-Streaming",
    "Medical-RAG",
    "Data-Streaming-With-Kafka",
    "Docker-Tutorial",
  ];
  const projectImages = [
    "/images/golang.png",
    "/images/zillow.png",
    "/images/aws.png",
    "/images/medicalRag.png",
    "/images/kafka.png",
    "/images/docker.png",
  ];
  const techStack = useMemo(() => [
    { key: "1", category: "Programming Languages", technology: "Python, C++, JavaScript, Go" },
    { key: "2", category: "Data Engineering", technology: "Snowflake, Airflow, dbt" },
    { key: "3", category: "Big Data", technology: "Hadoop, Spark, Kafka, Hive" },
    { key: "4", category: "Cloud Services", technology: "AWS (S3, Lambda, Redshift)" },
    { key: "5", category: "Databases", technology: "PostgreSQL, MongoDB, Cassandra" },
    { key: "6", category: "API Development", technology: "FastAPI, REST, Postman" },
    { key: "7", category: "Automation & Containerization", technology: "Docker, Kubernetes" },
    { key: "8", category: "Machine Learning", technology: "TensorFlow, Scikit-Learn, NLP" },
    { key: "9", category: "Data Visualization", technology: "Matplotlib, Seaborn, AWS QuickSight" },
    { key: "10", category: "Collaboration Tools", technology: "Git, GitHub, GitLab" },
  ], []);
  
  const pages = Math.ceil(techStack.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return techStack.slice(start, start + rowsPerPage);
  }, [page, techStack]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="relative flex flex-col min-h-screen bg-gray-900 text-white">
          {/* Floating Dock (Global Navigation) */}
          <div className="absolute top-0 right-0 z-50 [&_*]:text-[#EFDFBB]">
            <FloatingDockDemo />
          </div>

          {/* 1️⃣ Main Page */}
          <section className="flex justify-center items-center min-h-screen">
            <VortexDemo />
          </section>

          {/* 2️⃣ About Me Section */}
          <section className="min-h-screen bg-[#000000] text-[#EFDFBB] px-12 pb-16 pt-35">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                <Image
                  src="/photo1.jpg"
                  alt="Profile Image"
                  height={340}
                  width={940}
                  className="rounded-full shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-[50px] font-bold leading-tight custom-title-font">Het Patel</h1>
                <p className="text-2xl mt-6 custom-body-font">
                  I&apos;m currently working as a <strong>Data Scientist Intern</strong>. Passionate about <strong>Big Data, Cloud Computing, AI, and Distributed Computing</strong> to create scalable, high-performance systems. Meanwhile, I&apos;m exploring <strong>Golang</strong> to develop efficient, robust solutions that drive innovation.
                </p>
              </div>
            </div>
            {/* Tech Stack Table */}
            <div className="max-w-6xl mx-auto mt-16">
              <h2 className="text-4xl font-bold text-center mb-8 text-[#EFDFBB] custom-title-font">Tech Stack</h2>
              <Table
                aria-label="Tech Stack Table"
                bottomContent={
                  <div className="flex w-full justify-center mt-4">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="secondary"
                      page={page}
                      total={pages}
                      onChange={setPage}
                    />
                  </div>
                }
                classNames={{ wrapper: "min-h-[222px] border border-[#EFDFBB] rounded-md overflow-hidden" }}
              >
                <TableHeader>
                  <TableColumn key="category" className="text-lg font-bold text-left bg-transparent text-[#EFDFBB] border-b border-[#EFDFBB] custom-body-font">
                    CATEGORY
                  </TableColumn>
                  <TableColumn key="technology" className="text-lg font-bold text-left bg-transparent text-[#EFDFBB] border-b border-[#EFDFBB] custom-body-font">
                    TECHNOLOGY
                  </TableColumn>
                </TableHeader>
                <TableBody items={items}>
                  {(item) => (
                    <TableRow key={item.key} className="transition-all duration-300 hover:bg-[#1a1a1a] border-b border-[#222]">
                      {(columnKey) => <TableCell className="py-4 px-6 text-lg text-[#EFDFBB] custom-body-font">{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* 3️⃣ Projects Section */}
          <section className="min-h-screen bg-black px-12 pb-16 pt-32">
            <div className="w-full flex justify-center">
              <LampDemo />
            </div>
            <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 place-items-center">
              {projectNames.map((name, i) => (
                <ThreeDCardDemo key={i} title={name} href={`${githubPrefix}${name}`} imageURL={projectImages[i]} />
              ))}
            </div>
          </section>

          {/* Back to Top Button */}
          {showButton && <BackToTop />}

          {/* Footer */}
          <footer className="fixed bottom-0 left-0 w-full text-[#EFDFBB] bg-black text-center py-4 font-semibold text-lg">
            <p>📩 <a href="mailto:hettpatell1011@gmail.com" className="underline hover:text-gray-700">Mail me</a></p>
          </footer>
        </main>
      )}
    </>
  );
}
