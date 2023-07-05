import { useRouter } from "next/router";
import AdminWrapper from "../../Components/Admin/admin-wrapper/admin-wrapper";
import Link from "next/link";
import { Text24, Text48 } from "@/Components/common/text";
import { Card, Layout } from "@/Components/Admin/main/__styled";
import { Grid } from "antd";
import { Gap } from "@/Components/About/common/styles";

const { useBreakpoint } = Grid;

const AdminPage = () => {
  const router = useRouter();

  const { sm, md, lg, xl } = useBreakpoint();

  return (
    <AdminWrapper>
      <Gap sheight={`24px`} />
      <Text48 style={{ fontWeight: 600 }}>Основное</Text48>

      <Layout cols={xl ? 5 : lg ? 4 : md ? 3 : sm ? 2 : 1}>
        <Link href="/admin/home">
          <Card fill={"#E9480E"}>
            <Text24>Главная страница</Text24>
          </Card>
        </Link>

        <Link href="/admin/slider">
          <Card fill={"#FE7B7B"}>
            <Text24>Слайдер</Text24>
          </Card>
        </Link>

        <Link href="/admin/categories">
          <Card fill={"#7A2383"}>
            <Text24>Категории проектов</Text24>
          </Card>
        </Link>

        <Link href="/admin/projects">
          <Card fill={"#008769"}>
            <Text24>Проекты</Text24>
          </Card>
        </Link>

        <Link href="/admin/contacts">
          <Card fill={"#E9480E"}>
            <Text24>Контакты</Text24>
          </Card>
        </Link>
      </Layout>

      <Gap sheight={`48px`} />
      <Text48 style={{ fontWeight: 600 }}>Медиа</Text48>

      <Layout cols={xl ? 5 : lg ? 4 : md ? 3 : sm ? 2 : 1}>
        <Link href="/admin/news">
          <Card fill={`#FFC400`}>
            <Text24>Новости</Text24>
          </Card>
        </Link>

        <Link href="/admin/publications">
          <Card fill={`#166CEF`}>
            <Text24>Публикации</Text24>
          </Card>
        </Link>

        <Link href="/admin/interviews">
          <Card fill={`#C10000`}>
            <Text24>Интервью</Text24>
          </Card>
        </Link>

        <Link href="/admin/exhibitions">
          <Card fill={`#FE7B7B`}>
            <Text24>Выставки</Text24>
          </Card>
        </Link>
      </Layout>

      <Gap sheight={`48px`} />
      <Text48 style={{ fontWeight: 600 }}>О бюро</Text48>

      <Layout cols={xl ? 5 : lg ? 4 : md ? 3 : sm ? 2 : 1}>
        <Link href="/admin/about">
          <Card fill={"#166CEF"}>
            <Text24>О бюро</Text24>
          </Card>
        </Link>

        <Link href="/admin/team">
          <Card fill={"#C10000"}>
            <Text24>Команда</Text24>
          </Card>
        </Link>

        <Link href="/admin/partners">
          <Card fill={"#008769"}>
            <Text24>Партнеры</Text24>
          </Card>
        </Link>

        <Link href="/admin/vacancies">
          <Card fill={"#7A2383"}>
            <Text24>Вакансии</Text24>
          </Card>
        </Link>

        <Link href="/admin/awards">
          <Card fill={"#FFC400"}>
            <Text24>Награды</Text24>
          </Card>
        </Link>
      </Layout>

      <Gap sheight={`48px`} />
    </AdminWrapper>
  );
};

export default AdminPage;
